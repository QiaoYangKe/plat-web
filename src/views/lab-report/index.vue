<template>
  <el-container>
    <el-header height="auto">
      <el-form
        :inline="true"
        :model="queryForm"
        class="demo-form-inline"
      >
        <el-form-item>
          <el-select
            clearable
            v-model="queryForm.classId"
            multiple
            placeholder="请选择班级"
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
            v-model="queryForm.courseInfoId"
            multiple
            placeholder="请选择课程"
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
          <el-button type="primary" @click="exportScore">导出成绩</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="加载中"
        border
        fit
        :header-cell-style="{background: '#eeeeee'}"
        highlight-current-row
      >
        <el-table-column align="center" label="学号" width="95">
          <template slot-scope="scope">
            {{ scope.row.stuNo }}
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            {{ scope.row.userInfoName }}
          </template>
        </el-table-column>
        <el-table-column label="班级" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.className }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课程名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.courseName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日期" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleClick(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="打分" width="200" align="center">
          <template slot-scope="scope">
            <el-input
              placeholder="请打分"
              @blur="score(scope.row)"
              v-model="scope.row.scoreValue"
              size="mini"
              type="number"
            />
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryForm.pageIndex"
        :pageSize.sync="queryForm.pageSize"
        @pagination="query"
      />
    </el-main>
  </el-container>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import { classInfoDic } from "@/api/class-info.js";
import { appConsts } from "@/appConsts";
import { lessonList } from "@/api/feed-back";
import {
  addScoreInfo,
  scoreWork,
  scoreInfoList,
  exportScore,
  viewScoreInfo,
  viewScoreInfoForPDF,
} from "@/api/lab-report.js";
export default {
  userName: "LabReport",
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      list: [],
      total: 0,
      classList: [],
      courseList: [],
      appConsts: appConsts,
      queryForm: {
        pageIndex: 1,
        pageSize: 10,
        classId: undefined,
        userName: undefined,
        courseInfoId: undefined,
      },
    };
  },
  mounted() {
    this.query();
    this.initClassList();
    this.initCourse();
  },
  create() {
    this.src = pdf.createLoadingTask(this.src);
  },
  methods: {
    initClassList() {
      classInfoDic().then((res) => {
        this.classList = res.data;
      });
    },
    query() {
      scoreInfoList(this.queryForm).then((res) => {
        this.list = res.data;
        this.total = res.total;
        this.listLoading = false;
      });
    },
    initCourse() {
      lessonList().then((res) => {
        this.courseList = res.data;
      });
    },
    score(row) {
      if (row.scoreValue) {
        scoreWork({ id: row.id, scoreValue: Number(row.scoreValue) }).then(
          (res) => {
            this.$message({
              type: "success",
              message: "评分成功",
            });
          }
        );
      }
    },
    exportScore() {
      if(this.queryForm.courseInfoId == null || this.queryForm.classId == null) {
        this.$message({
          type: 'warning',
          message: '请选择班级和课程'
        })
      } else {
        exportScore(this.queryForm).then(res => {
          console.log(res)
          const blob = new Blob([res], {type: 'application/zip;charset=utf-8'});
          const fileName = '学习成绩.xls'//下载的文件名称及其后缀，后缀要和后台保持的一致
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        })
      }
    },
    handleClick(row) {
      let { href } = this.$router.resolve({
        path: "/report-view",
        query: {
          fileList: row.lessonFileList,
        },
      });
      window.open(href, "_blank");
    },
  },
};
</script>

<style lang='scss' scoped>
.el-container {
  .el-header {
    padding: 20px 35px 3px 35px;
    display: flex;
    flex-flow: row;
    .demo-form-inline {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
  .el-main {
    padding: 10px 35px;
  }
}
.secret-button {
  color: green;
}
.delete-button {
  color: red;
}
</style>
