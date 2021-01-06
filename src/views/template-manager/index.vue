<template>
  <el-container>
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
          <el-table-column label="名称">
            <template slot-scope="scope">
              {{ scope.row.vmName }}
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.vmType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="系统" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.vmSystem }}</span>
            </template>
          </el-table-column>
          <el-table-column label="端口" align="center">
           <template slot-scope="scope">
              <span>{{ scope.row.vncPort }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | dateFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="clickSee(scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="cloneTemplate(scope.row)">克隆</el-button>
            </template>
          </el-table-column>
        </el-table>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="40%">
        <el-form label-width="80px" :model="detailMessage">
          <el-form-item label="名称">
            <span>{{ detailMessage.vmName }}</span>
          </el-form-item>
          <el-form-item label="IP">
            <span>{{ detailMessage.vmip }}</span>
          </el-form-item>
          <el-form-item label="端口号">
            <span>{{ detailMessage.vncPort }}</span>
          </el-form-item>
          <el-form-item label="名称">
            <span>{{ detailMessage.vmName }}</span>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import { templateList, cloneVm, cloneVmById, vmById, createVm } from '@/api/template-manager.js'
export default {
  name: 'TemplateManager',
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
      dialogVisible: false,
      detailMessage: {},
      list: [],
      total: 0,
      queryForm: {}
    }
  },
  mounted() {
    this.query()
  },
  methods: {
    query() {
      templateList(this.queryForm).then(res => {
        this.list = res.data
        this.listLoading = false
      })
    },
    async clickSee(row) {
      await vmById(row.id).then(res => {
        this.detailMessage = res.data
      })
      this.dialogVisible = true
    },
    cloneTemplate(row) {
      const loading = this.$loading({
          lock: true,
          text: '请稍等，大概2-3分钟',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      cloneVmById(row.id).then(res => {
        this.$message({
          type: 'success',
          message: '克隆成功'
        })
        loading.close()
        this.query()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .el-container {
    .el-main {
      padding: 20px;
    }
  }
  .secret-button {
    color: green;
  }
  .delete-button {
    color: red;
  }
</style>
