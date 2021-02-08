<template>
  <el-container>
    <el-header height="auto">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item>
          <el-select
            clearable
            v-model="queryForm.ClassIds"
            placeholder="请选择班级"
            multiple
            @change="classChange"
            collapse-tags
          >
            <el-option
              v-for="item in classList"
              :label="item.className"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            clearable
            v-model="queryForm.CourseInfoIds"
            placeholder="请选择课程"
            @change="courseChange"
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in courseList"
              :label="item.name"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="queryForm.userName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-card :body-style="{ width: '100%', height: '100%' }">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="加载中"
          border
          fit
          :header-cell-style="{ background: '#eeeeee' }"
          tooltip-effect="light"
          highlight-current-row
        >
          <el-table-column align="center" label="学号" width="95">
            <template slot-scope="scope">
              {{ scope.row.StuNo }}
            </template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              {{ scope.row.UserName }}
            </template>
          </el-table-column>
          <el-table-column label="班级" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.ClassName }}</span>
            </template>
          </el-table-column>
          <template v-if="selectedCourses.length === 0">
            <el-table-column
              v-for="item in courseList"
              :key="item.id"
              :label="item.name"
            >
              <template slot-scope="scope">
                <span>{{ scope.row[`${item.number}`] }}</span>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              v-for="item in selectedCourses"
              :key="item.id"
              :label="item.name"
            >
              <template slot-scope="scope">
                <span>{{ scope.row[`${item.number}`] }}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="平均分" align="left">
            <template slot-scope="scope">
              <span> {{ scope.row.AvgScore }} </span>
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryForm.pageIndex"
          :limit.sync="queryForm.pageSize"
          @pagination="query"
        />
      </el-card>
      <el-card :body-style="{ width: '100%', minWidth: '650px', height: '100%' }">
        <div class="clear-fix">
          <span class="span-class">成绩统计</span>
        </div>
        <div class="content-class">
          <div id="demo" style="width: 300px;height: 300px; float: left"></div>
          <div
            id="demoRight"
            style="width: 300px;height: 300px; float: left"
          ></div>
          <div
            id="demoBottom"
            style="width: 600px;height: 350px; float: left"
          ></div>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import echarts from "echarts";
import {
  studentScore as scoreInfoList,
  statistics as scoreEcharts
} from "@/api/student-score";
import { classInfoDic } from "@/api/class-info.js";
import { lessonList } from "@/api/feed-back";
export default {
  name: "StudentGrade",
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      list: [],
      total: 0,
      classList: [],
      courseList: [],
      courseChangeVisble: true,
      classChangeVisble: false,
      selectedCourses: [],
      echartsObj: {},
      queryForm: {
        pageIndex: 1,
        pageSize: 10,
        ClassIds: undefined,
        userName: undefined,
        CourseInfoIds: undefined
      }
    };
  },
  mounted() {
    this.query();
    this.initClassList();
    this.initCourse();
    this.initChars();
    window.onresize = function() {
      this.initChars();
    };
  },
  methods: {
    async initChars() {
      await scoreEcharts({}).then(res => {
        this.echartsObj = res.data;
      });
      const myChart = echarts.init(document.getElementById("demo"));
      const myChartRight = echarts.init(document.getElementById("demoRight"));
      const myChartBottom = echarts.init(document.getElementById("demoBottom"));

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: "最新阶段分数统计",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ["#a2baf6", "#6b9ddb", "#3c90f7", "#24335a"],
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            label: {
              position: "inside",
              formatter: "{b} \n{d}%"
            },
            data: this.echartsObj.lastStage,
            emphasis: {
              label: {
                fontSize: "14",
                fontWeight: "light"
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 指定图表的配置项和数据
      const optionRight = {
        title: {
          text: "所选阶段平均分统计",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ["#a2baf6", "#6b9ddb", "#3c90f7", "#24335a", "#6b9ddb"],
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            label: {
              position: "inside",
              formatter: "{b} \n{d}%"
            },
            data: this.echartsObj.allStage,
            emphasis: {
              label: {
                fontSize: "14",
                fontWeight: "light"
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 指定图表的配置项和数据
      const optionBottom = {
        title: {
          text: "所选阶段分数统计",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color: [
          "#3c90f7",
          "#55bfc0",
          "#034d9b",
          "#517ba9",
          "##5ebe67",
          "#229991"
        ],
        series: [
          {
            name: "占比",
            type: "pie",
            radius: ["50%", "70%"],
            label: {
              formatter: "{b} \n{d}%"
            },
            emphasis: {
              label: {
                fontSize: "14",
                fontWeight: "light"
              }
            },
            data: this.echartsObj.allClassStatistics
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      myChartRight.setOption(optionRight);
      myChartBottom.setOption(optionBottom);
    },
    initCourse() {
      lessonList().then(res => {
        this.courseList = res.data;
      });
    },
    initClassList() {
      classInfoDic().then(res => {
        this.classList = res.data;
      });
    },
    query() {
      scoreInfoList(this.queryForm).then(res => {
        this.list = res.data.rows;
        this.total = res.data.total;
        this.listLoading = false;
        if(this.courseChangeVisble) {
          let arr = res.data.courses.sort(function(a,b) {
            return a['createTime'] - b['createTime']
          });
          this.$set(this, 'selectedCourses',arr);
          this.courseChangeVisble = false;
        }
        if(this.classChangeVisble || this.courseChangeVisble) {
          this.initChars();
          this.classChangeVisble = false;
          this.courseChangeVisble = false;
        }
      });
    },
    courseChange() {
      this.courseChangeVisble = true;
    },
    classChange() {
      this.classChangeVisble = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  .el-header {
    padding: 20px 35px 3px 10px;
    display: flex;
    flex-flow: row;
    .demo-form-inline {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
  .el-main {
    width: 100%;
    height: calc(100vh - 120px);
    padding: 10px 10px;
    display: flex;
    flex-flow: row;
    .el-card:nth-of-type(2) {
      width: 40%;
    }
    .el-card:nth-of-type(1) {
      margin-right: 20px;
      width: 60%;
    }
  }
}
.clear-fix {
  margin: -10px 0 20px -10px;
  .span-class {
    display: flex;
    line-height: 16px;
  }
  .span-class::before {
    content: "";
    display: inline-block;
    width: 4px;
    background: #0a76a4;
    margin-right: 4px;
  }
}
</style>
