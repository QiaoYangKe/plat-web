<template>
  <el-container>
    <el-header height="auto">
      <el-button @click="feedBackShow" type="primary">提交反馈</el-button>
      <FeedBackEdit
        ref="feedBackEdit"
        :lessonList="lessonList"
        title="提交反馈"
        :query="query"
      />
    </el-header>
    <el-main>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="加载中"
        border
        fit
        tooltip-effect="light"
        :header-cell-style="{background: '#eeeeee'}"
        highlight-current-row
      >
        <el-table-column align="center" width="50px">
          <i class="el-icon-message" />
        </el-table-column>
        <el-table-column align="center" label="反馈人">
          <template slot-scope="scope">
            {{ scope.row.fromUserInfoName }}
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
            <el-button type="text" @click="handleClick(scope.row)"
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
import { lessonList, getFeedBackInfos } from "@/api/feed-back.js";
import FeedBackEdit from "@/views/question-feedback/feedBackEdit.vue";
export default {
  name: "QuestionFeedback",
  components: { Pagination, FeedBackEdit },
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
      lessonList: [],
      form: {
        lessonPic: "",
        fBTitle: "",
        fBContent: "",
      },
      queryForm: {
        pageIndex: 1,
        pageSize: 10,
        classNo: undefined,
        name: undefined,
        studentNo: undefined,
      },
    };
  },
  mounted() {
    this.query();
    this.initLessonList();
  },
  methods: {
    submit() {
      addFeedBack(this.form).then((res) => {});
    },
    initLessonList() {
      lessonList().then((res) => {
        this.lessonList = res.data;
      });
    },
    query() {
      getFeedBackInfos(this.queryForm).then((res) => {
        this.list = res.data;
        this.total = res.total;
        this.listLoading = false;
      });
    },
    feedBackShow() {
      this.$refs.feedBackEdit.show();
    },
    addClick() {
      addFeedBack(this.form).then((res) => {
        this.$message({
          type: "success",
          message: "添加成功",
        });
        this.query();
      });
    },
    handleClick(row) {
      this.$router.push(`/answer-detail/${row.groupId}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  min-width: 1200px;
  .el-header {
    margin-top: 10px;
  }
}
</style>
