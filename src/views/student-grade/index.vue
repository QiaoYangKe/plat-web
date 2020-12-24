<template>
  <el-container>
    <el-header height="auto">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="small">
        <el-form-item>
          <el-select v-model="queryForm.classNo" placeholder="请选择班级">
            <el-option v-for="item in classList" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.studentNo" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-card :body-style="{width: '1000px'}">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="加载中"
          border
          fit
          size="mini"
          highlight-current-row
        >
          <el-table-column align="center" label="学号" width="95">
            <template slot-scope="scope">
              {{ scope.row.studentNo }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="120px">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="班级" width="120px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.classNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="XXXX" width="140px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.noOne }}</span>
            </template>
          </el-table-column>
        </el-table>
        <Pagination v-show="total>0" :total="total" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="query" />
      </el-card>
      <el-card :body-style="{width: '550px'}">
        <div class="clear-fix">
          <span class="span-class">成绩展示</span>
        </div>
        <div class="content-class">
          <div id="demo" style="width: 250px;height: 250px; float: left"></div>
          <div id="demoRight" style="width: 250px;height: 250px; float: left"></div>
          <div id="demoBottom" style="width: 400px;height: 300px; float: left"></div>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
  import Pagination from '@/components/Pagination/index.vue'
  import echarts from 'echarts'
export default {
  name: 'StudentGrade',
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      list: [],
      total: 0,
      classList: [],
      queryForm: {
        page: 1,
        limit: 10,
        classNo: undefined,
        name: undefined,
        studentNo: undefined
      }
    }
  },
  mounted() {
    this.initData()
    this.initClassList()
    this.initChars()
    window.onresize = function(){
      this.initChars()
    }
  },
  methods: {
    onSubmit() {},
    initChars() {
      const myChart = echarts.init(document.getElementById('demo'))
      const myChartRight = echarts.init(document.getElementById('demoRight'))
      const myChartBottom = echarts.init(document.getElementById('demoBottom'))

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '班级最新阶段分数统计',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '占比',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            label:{
               position:'inside',
               formatter: '{b} \n{d}%'
            },
            data: [
              {value: 0.2, name: '60-80'},
              {value: 0.4, name: '80-90'},
              {value: 0.3, name: '>90'},
              {value: 0.1, name: '<60'}
            ],
            emphasis: {
              label: {
                fontSize: '14',
                fontWeight: 'light'
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      // 指定图表的配置项和数据
      const optionBottom = {
        title: {
          text: '班级最新阶段统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '占比',
            type: 'pie',
            radius: ['50%', '70%'],
            label: {
              formatter: '{b} \n{d}%'
            },
            emphasis: {
              label: {
                fontSize: '14',
                fontWeight: 'light'
              }
            },
            data: [
              {value: 0.2, name: '60-80'},
              {value: 0.4, name: '80-90'},
              {value: 0.3, name: '>90'},
              {value: 0.1, name: '<60'}
            ],
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      myChartRight.setOption(option);
      myChartBottom.setOption(optionBottom);
    },
    initClassList() {
      this.classList = [
        { id:'1001', name: '一班'},
        { id:'1002', name: '二班'}
      ];
    },
    initData() {
      this.list = [
        { classNo: '10081', studentNo: '1001', name: '小明'}
      ]
      this.total = 1
      this.listLoading = false
    },
    addClick() {
      alert('新增')
    },
    handleClick(row) {
      alert('查看')
    },
    query() {}
  }
}
</script>

<style lang='scss' scoped>
  .el-container {
    width: 100%;
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
      padding: 10px 10px;
      display: flex;
      flex-flow: row;
    }
  }
  .clear-fix{
    margin: -10px 0 20px -10px;
    .span-class {
      display: flex;
      line-height: 16px;
    }
    .span-class::before {
      content: '';
      display: inline-block;
      width: 4px;
      background: #0a76a4;
      margin-right: 4px;
    }
  }
</style>
