<template>
  <el-container>
    <el-header height="auto">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="queryForm.classInfoId" placeholder="请选择班级">
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
            v-model="queryForm.stuNo"
            placeholder="请输入工号"
          ></el-input>
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
        <el-form-item>
          <el-button type="primary" @click="addClick">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo"
            action
            :auto-upload="true"
            :http-request="customUpload"
            :limit="1"
            style="float: right"
            :show-file-list="false"
            :file-list="fileList"
          >
            <el-button type="primary">新增上传</el-button>
          </el-upload>
        </el-form-item>
         <el-form-item>
          <el-button type="danger" @click="delClick">删除</el-button>
        </el-form-item>
        <el-dialog title="老师信息" :visible.sync="dialogFormVisible" width="750px">
          <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="名称" :prop="userName">
              <el-input v-model="form.userName" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="性别" :prop="sex">
              <el-select v-model="form.sex" placeholder="请选择" :style="inputWidth">
                <el-option
                  label="男"
                  :value="true"
                ></el-option>
                <el-option
                  label="女"
                  :value="false"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工号" :prop="stuNo">
              <el-input v-model="form.stuNo" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="手机" :prop="phone">
              <el-input v-model="form.phone" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="职称" :prop="remarks">
              <el-input v-model="form.remarks" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="账号" :prop="userAccount">
              <el-input v-model="form.userAccount" :style="inputWidth"></el-input>
            </el-form-item>
            <el-form-item label="班级" :prop="classInfoId">
              <el-select v-model="form.classInfoId" placeholder="请选择" :style="inputWidth">
                <el-option
                  v-for="item in classList"
                  :key="item.id"
                  :label="item.className"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editSubmit">确 定</el-button>
          </div>
        </el-dialog>
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
        @selection-change="handleSelectionChange"
      >
       <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column align="center" label="工号">
          <template slot-scope="scope">
            {{ scope.row.stuNo }}
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            {{ scope.row.userName }}
          </template>
        </el-table-column>
        <el-table-column label="班级" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.className }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sex ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="职称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.remarks }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editUser(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="resetUser(scope.row)"
              class="secret-button"
              >重置密码</el-button
            >
            <el-button
              type="text"
              @click="delUser(scope.row)"
              class="delete-button"
              >删除</el-button
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
import {
  userList,
  resetPwd,
  updateUser,
  addUser,
  deleteUser,
  deleteUserBatch,
  uploadUserInfo,
  importExcel
} from "@/api/user.js";
import { classInfoDic } from "@/api/class-info.js";
export default {
  name: "TeacherManager",
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      dialogFormVisible: false,
      list: [],
      inputWidth: {width: '250px',marginBottom: "20px"},
      total: 0,
      classList: [],
      fileList: [],
      multipleSelection: [],
      form: {},
      filePath: "",
      rules: {
        stuNo: [
          { required: true, message: "请输入工号/学号", trigger: "blur" }
        ],
        userAccount: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        phone: [
          { pattern: /^1[3-9](\d{9})$/, message: "请输入手机号", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "请选择性别", trigger: "blur" }
        ]
      },
      queryForm: {
        pageIndex: 1,
        pageSize: 10,
        userType: 0,
        classInfoId: undefined,
        userName: undefined,
        stuNo: undefined
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
    handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    addClick() {
      this.form = {
        id: null,
        stuNo: "",
        userAccount: "",
        userName: "",
        userType: 0,
        vmCount: 0,
        groupName: "",
        classInfoId: "",
        phone: "",
        picture: "",
        sex: true,
        remarks: ""
      };
      this.dialogFormVisible = true;
    },
    delClick() {
      let userIds = this.multipleSelection.map(item => item.id);
      deleteUserBatch({userIds: userIds}).then(res => {
      this.$message({
        type: "success",
        message: "删除成功"
      });
      this.query();
      });
    },
    query() {
      userList(this.queryForm).then(res => {
        this.list = res.obj;
        this.total = res.total;
        this.listLoading = false;
      });
    },
    editSubmit() {
      if(this.form.id === "") {
        addUser(this.form).then(res => {
        this.$message({
          type: "success",
          message: "添加成功"
        });
        this.query();
        this.dialogFormVisible = false;
      });
      } else {
        updateUser(this.form).then(res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.query();
        this.dialogFormVisible = false;
      });
      }
    },
    customUpload(file) {
      let param = new FormData();
      param.append("files", file.file);
      uploadUserInfo(param).then(res => {
        importExcel({ filePath: res.data }).then(res => {
          this.$message({
            type: "success",
            message: "上传成功"
          });
          this.query();
        });
      });
    },
    editUser(row) {
      this.form = row;
      this.dialogFormVisible = true;
    },
    delUser(row) {
      deleteUser(row.id).then(res => {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.query();
      });
    }
  },
  resetUser(row) {
    resetPwd(row.id).then(res => {
      this.$message({
        type: "success",
        message: "重置成功"
      });
    });
  }
};
</script>

<style lang="scss" scoped>
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
