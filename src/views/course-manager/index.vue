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
            v-model="queryForm.classId"
            placeholder="请选择班级"
            style="width: 400px"
          >
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.className"
              :value="item.id"
            ></el-option>
          </el-select>
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
        highlight-current-row
        :header-cell-style="{background: '#eeeeee'}"
      >
        <el-table-column align="center" label="课程编号" width="95">
          <template slot-scope="scope">
            {{ scope.row.number }}
          </template>
        </el-table-column>
        <el-table-column label="课程名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
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
            <el-button
              type="text"
              @click="changeCourseState(scope.row)"
              :class="scope.row.isEnable ? 'delete-button' : ''"
              >{{ scope.row.isEnable ? "关闭课程" : "开放课程" }}</el-button
            >
            <el-button type="text" @click="editCourse(scope.row)"
              >修改课程</el-button
            >
            <el-button type="text" @click="enterCourse(scope.row)"
              >进入课程</el-button
            >
            <!-- <el-button size="mini" type="text" @click="cloneCourse(scope.row)"
              >克隆课程</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-dialog title="绑定小组" width="450px" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-select
              v-model="form.classId"
              placeholder="请选择班级"
              style="width: 300px"
              @change="handelChange"
            >
              <el-option
                v-for="item in courseClassList"
                :key="item.id"
                :label="item.className"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="小组名称" :label-width="formLabelWidth">
            <el-select
              v-model="form.groupName"
              placeholder="请选择小组"
              :loading="groupLoading"
              style="width: 300px"
            >
              <el-option
                v-for="item in groupList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="虚拟机模板" :label-width="formLabelWidth">
            <el-select
              v-model="form.vmInfoIds"
              placeholder="请选择班虚拟机模板"
              multiple
              style="width: 300px"
              collapse-tags
              clearable
            >
              <el-option
                v-for="item in vmInfos"
                :key="item.id"
                :label="item.vmName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding-right: 20px">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="bindGroupSubmit" size="small"
            >确 定</el-button
          >
        </div>
      </el-dialog> -->
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
  courseList,
  addCourse,
  updateCourse,
  updateVm,
  deleteCourse,
  courseInfoById,
  updateCourseState,
  teamMenmberByClassDic,
} from "@/api/course-info.js";
import { classInfoDic } from "@/api/class-info.js";
import { vmClone } from "@/api/template-manager.js";
// import { BindGroup } from "@/api/vm-info"
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
    },
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
        vmInfoIds: [],
      },
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
      // this.classList = []
      classInfoDic().then((res) => {
        this.classList = res.data;
      });
    },
    enterCourse(row) {
      this.courseClassList = this.classList.filter(
        (item) => row.classIdList.indexOf(item.id) !== -1
      );
      courseInfoById(row.id).then((res) => {
        this.vmInfos = res.data.vmInfos
        this.dialogFormVisible = true
      });
      this.$router.push({ path: "/course-detail", query: { id: row.id } });
    },
    handelChange(val) {
      this.groupLoading = true;
      this.form.groupName = "";

      teamMenmberByClassDic({ classId: val }).then(res => {
        this.groupList = res.data
        this.groupLoading = false
      })
    },
    // bindGroupSubmit() {
    //   BindGroup(this.form).then(res => {
    //     this.dialogFormVisible = false
    //     this.$message({
    //       type: 'success',
    //       message: '绑定成功'
    //     })
    //   })
    // },
    query() {
        // this.list = [{},{}];
        // this.total = 2;
        // this.listLoading = false;
      courseList(this.queryForm).then((res) => {
        this.list = res.data;
        this.total = res.total;
        this.listLoading = false;
      });
    },
    // cloneCourse(row) {
    //   const loading = this.$loading({
    //     lock: true,
    //     text: "请稍等，预计2-3分钟",
    //     spinner: "el-icon-loading",
    //     background: "rgba(0, 0, 0, 0.7)",
    //   });
    //   vmClone({ courseId: row.id, vmCount: 1 }).then((res) => {
    //     this.$message({
    //       type: "success",
    //       message: "克隆成功",
    //     });
    //     loading.close();
    //   });
    // },
    changeCourseState(row) {
      updateCourseState(row.id).then((res) => {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.query();
      });
    },
    editCourse(row) {
      this.$router.push({ path: "/course-setting", query: { id: row.id } });
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
