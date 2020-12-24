<template>
  <el-container>
    <el-header height="auto">
      <el-form
        :inline="true"
        :model="queryForm"
        class="demo-form-inline"
        size="small"
      >
        <el-form-item>
          <el-select clearable v-model="queryForm.classId" placeholder="请选择班级">
            <el-option
              v-for="item in classList"
              :label="item.className"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="queryForm.studentNo"
            placeholder="请输入学号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="queryForm.name"
            placeholder="请输入姓名"
          ></el-input>
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
        tooltip-effect="light"
        size="mini"
        highlight-current-row
      >
        <el-table-column align="center" width="50px">
          <i class="el-icon-message" />
        </el-table-column>
        <el-table-column align="center" label="反馈人">
          <template slot-scope="scope">
            {{ scope.row.feedBackUserInfoName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="反馈标题">
          <template slot-scope="scope">
            {{ scope.row.fbTitle }}
          </template>
        </el-table-column>
        <el-table-column label="反馈内容" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.fbContent }}
          </template>
        </el-table-column>
        <el-table-column label="反馈时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleClick(scope.row)"
              ><i class="el-icon-s-promotion" />查看</el-button
            >
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
    </el-main>
  </el-container>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import { classInfoDic } from "@/api/class-info.js";
import { getFeedBackInfos } from "@/api/feed-back.js";
export default {
  name: "QuestionAnswer",
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
    },
  },
  data() {
    return {
      listLoading: true,
      list: [],
      total: 0,
      classList: [],
      queryForm: {
        pageIndex: 1,
        pageSize: 10,
        classId: undefined,
        name: undefined,
        studentNo: undefined,
      },
    };
  },
  mounted() {
    this.query();
    this.initClassList();
  },
  methods: {
    initClassList() {
      classInfoDic().then((res) => {
        this.classList = res.data;
      });
    },
    query() {
      getFeedBackInfos(this.queryForm).then((res) => {
        this.list = res.data;
        this.total = res.total;
        this.listLoading = false;
      });
    },
    handleClick(row) {
      this.$router.push(`/answer-detail/${row.id}`);
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
