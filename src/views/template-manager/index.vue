<template>
  <el-container>
    <el-header height="auto">
      <el-form :inline="true" ref="queryForm" :model="queryForm" class="demo-form-inline" size="small">
        <el-form-item prop="startTime">
          <el-date-picker
            v-model="queryForm.startTime"
            type="datetime"
            placeholder="起始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endTime">
          <el-date-picker
            v-model="queryForm.endTime"
            type="datetime"
            placeholder="终止时间">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="查询条件" prop="studentNo">
          <el-input v-model="queryForm.studentNo" placeholder="请输入..."></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="成功" prop="name">
          <el-select v-model="queryForm.name" placeholder="请选择">
            <el-option
              key="0"
              label="成功"
              value="0">
            </el-option>
            <el-option
              key="1"
              label="失败"
              value="1">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button class="add-button" type="primary" @click="delLogs">删除</el-button>
          <el-button class="add-button" type="primary" @click="resetLogs">清空</el-button>
          <el-button class="add-button" type="primary" @click="resetForm('queryForm')">重置查询条件</el-button>
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
          size="mini"
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column label="标题">
            <template slot-scope="scope">
              {{ scope.row.manageMsg }}
            </template>
          </el-table-column>
          <el-table-column label="成功" align="center">
            <template slot-scope="scope">
              <span>{{ !scope.row.manageType ? '成功': '失败'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | dateFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作人" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
        </el-table>
       <Pagination v-show="total>0" :total="total" :page.sync="queryForm.pageIndex" :limit.sync="queryForm.pageSize" @pagination="query" />
    </el-main>
  </el-container>
</template>

<script>
  import Pagination from '@/components/Pagination/index.vue'
  import { logInfoList, deleteLogs, clearAll } from '@/api/log-manager.js'
export default {
  name: 'LogManager',
  components: { Pagination },
  filters: {
    dateFormat (val) {
      if (val == null || val === '') {
        return ''
      } else {
        const d = new Date(val) // val 为表格内取到的后台时间
        const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
        const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
        const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
        const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
        const sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
        const times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec
        return times
      }
    }
  },
  data() {
    return {
      listLoading: true,
      list: [],
      selectList: [],
      total: 0,
      queryForm: {
        pageIndex: 1,
        pageSize: 10,
        startTime: undefined,
        endTime: undefined
      }
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    query() {
      logInfoList(this.queryForm).then(res => {
        this.list = res.obj
        this.total = res.total
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      this.selectList = val
    },
    resetLogs() {
      clearAll().then(res => {
        this.$message({
          type: 'success',
          message: '清空成功'
        })
        this.query()
      })
    },
    delLogs() {
      if(this.selectList.length == 0) {
        this.$message({
          type: 'warning',
          message: '至少选中一条'
        })
        return
      }
      let list = this.selectList
      let listIds = []
      for(let i=0; i < list.length; i++) {
        listIds.push(list[i].id)
      }
      console.log(listIds)
      deleteLogs(listIds).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.query()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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
