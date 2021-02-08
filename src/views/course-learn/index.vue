<template>
  <el-container>
    <el-header height="auto">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="queryForm.name" placeholder="请输入名称" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
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
        :header-cell-style="{ background: '#eeeeee' }"
        highlight-current-row
      >
        <el-table-column align="center" label="课程编号" width="120">
          <template slot-scope="scope">
            {{ scope.row.number }}
          </template>
        </el-table-column>
        <el-table-column label="课程名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="成绩" align="center">
          <template slot-scope="scope">
            {{ scope.row.score==0? '未打分':scope.row.score }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="enterCourse(scope.row)"
              >进入课程</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        v-show="total > 0"
        :total="total"
        :pageIndex.sync="queryForm.pageIndex"
        :pageSize.sync="queryForm.pageSize"
        @pagination="query"
      />
    </el-main>
  </el-container>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import {
  courseInfoById,
  updateCourseState,
  courseScore,
  teamMenmberByClassDic
} from "@/api/course-info.js";
import { classInfoDic } from "@/api/class-info.js";
export default {
  name: "CourseManager",
  components: { Pagination },
  filters: {
    dateFormat(val) {
      if (val == null || val === "") {
        return "";
      } else {
        const d = new Date(val); // val 为表格内取到的后台时间
        const month =
          d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
        const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
        const hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
        const min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
        const sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
        const times =
          d.getFullYear() +
          "-" +
          month +
          "-" +
          day +
          " " +
          hours +
          ":" +
          min +
          ":" +
          sec;
        return times;
      }
    }
  },
  data() {
    return {
      listLoading: true,
      groupLoading: true,
      list: [],
      total: 0,
      classList: [],
      courseClassList: [],
      dialogFormVisible: false,
      formLabelWidth: "100px",
      groupList: [],
      vmInfos: [],
      form: {
        classId: "",
        groupName: "",
        vmInfoIds: []
      },
      queryForm: {
        pageIndex: 1,
        pageSize: 10,
        name: undefined,
        isActive: true
      }
    };
  },
  mounted() {
    this.query();
    this.initClassList();
  },
  methods: {
    initClassList() {
      classInfoDic().then(res => {
        this.classList = res.data;
      });
    },
    enterCourse(row) {
      this.courseClassList = this.classList.filter(
        item => row.classIdList.indexOf(item.id) !== -1
      );
      courseInfoById(row.id).then(res => {
        this.vmInfos = res.data.vmInfos;
        this.dialogFormVisible = true;
      });
      this.$router.push({
        path: "/course-learn-detail",
        query: { id: row.id }
      });
    },
    handelChange(val) {
      this.groupLoading = true;
      this.form.groupName = "";

      teamMenmberByClassDic({ classId: val }).then(res => {
        this.groupList = res.data;
        this.groupLoading = false;
      });
    },
    query() {
      courseScore(this.queryForm).then(res => {
        this.list = res.data;
        this.total = res.total;
        this.listLoading = false;
      });
    },
    changeCourseState(row) {
      updateCourseState(row.id).then(res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.query();
      });
    },
    editCourse(row) {
      this.$router.push({ path: "/course-setting", query: { id: row.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  min-width: 1200px;
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
