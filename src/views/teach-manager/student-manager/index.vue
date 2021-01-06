<template>
  <el-container>
    <el-header height="auto">
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="queryForm.classInfoId" placeholder="请选择班级">
            <el-option v-for="item in classList" :key="item.id" :label="item.className" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.stuNo" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryForm.userName" placeholder="请输入姓名"></el-input>
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
            :http-request= "customUpload"
            :limit="1"
            style="float: right"
            :show-file-list="false"
            :file-list="fileList">
            <el-button type="primary">新增上传</el-button>
          </el-upload>
        </el-form-item>
        <el-dialog title="学生信息" :visible.sync="dialogFormVisible">
          <el-form :model="form" style="display: flex;flex-flow: row">
            <el-form-item label="学生名称">
              <el-input v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="form.stuNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属小组">
              <el-input v-model="form.groupName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="班级">
              <el-select v-model="form.classInfoId" placeholder="请选择">
                <el-option v-for="item in classList" :key="item.id" :label="item.className" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最大连接">
              <el-input v-model="form.vmCount" autocomplete="off" type="number"></el-input>
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
          :header-cell-style="{background: '#eeeeee'}"
          highlight-current-row
        >
          <el-table-column align="center" label="学号">
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
          <el-table-column label="所属小组" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.groupName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="允许虚拟机数量" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.vmCount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="editUser(scope.row)">编辑</el-button>
              <el-button size="mini" type="text" @click="reUser(scope.row)" class="secret-button">重置密码</el-button>
              <el-button size="mini" type="text" @click="delUser(scope.row)" class="delete-button">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
       <Pagination v-show="total>0" :total="total" :page.sync="queryForm.pageIndex" :limit.sync="queryForm.pageSize" @pagination="query" />
    </el-main>
  </el-container>
</template>

<script>
  import Pagination from '@/components/Pagination/index.vue'
  import { userList, resetPwd, updateUser, deleteUser, uploadUserInfo, importExcel,addUser } from '@/api/user.js'
  import { classInfoDic } from '@/api/class-info.js'
export default {
  name: 'StudentManager',
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      dialogFormVisible: false,
      list: [],
      total: 0,
      classList: [],
      fileList: [],
      form: {},
      filePath: '',
      queryForm: {
        pageIndex: 1,
        pageSize: 10,
        userType: 1,
        classInfoId: undefined,
        userName: undefined,
        stuNo: undefined
      }
    }
  },
  mounted() {
    this.query()
    this.initClassList()
  },
  methods: {
    initClassList() {
      classInfoDic().then(res => {
        this.classList = res.data
      })
    },
    query() {
      userList(this.queryForm).then(res => {
        this.list = res.obj
        this.total = res.total
        this.listLoading = false
      })
    },
    addClick() {
      this.form = {
        id: null,
        stuNo: "",
        userAccount: "",
        userName: "",
        userType: 1,
        vmCount: 0,
        groupName: "",
        classInfoId: ""
      }
      this.dialogFormVisible = true
    },
    editSubmit() {
      if(this.form.id == null) {
        addUser(this.form).then(res => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.query()
          this.dialogFormVisible = false
        })
      }
      updateUser(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.query()
        this.dialogFormVisible = false
      })
    },
    customUpload(file) {
      let param = new FormData()
      param.append('files',file.file)
      uploadUserInfo(param).then(res => {
        importExcel({ filePath: res.data} ).then(res => {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
          this.query()
        })
      })
    },
    editUser(row) {
      this.form = row
      this.dialogFormVisible = true
    },
    delUser(row) {
      deleteUser(row.id).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.query()
      })
    },
    reUser(row) {
      resetPwd(row.id).then(res => {
        this.$message({
          type: 'success',
          message: '重置成功'
        })
      })
    }
  }
}
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
