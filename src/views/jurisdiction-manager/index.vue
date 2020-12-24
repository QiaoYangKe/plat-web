<template>
  <el-container>
    <el-header height="auto">
<!--      <el-button size="small" type="primary" icon="el-icon-plus" @click="addClick">新增</el-button>
      <el-button type="danger" icon="el-icon-delete" size="small" @click="onSubmit">删除</el-button>-->
    </el-header>
    <el-main>
        <el-table
          v-loading="listLoading"
          :data="list"
          :current-change="(row) => { this.currentRow = row}"
          element-loading-text="加载中"
          border
          fit
          size="mini"
          highlight-current-row
        >
          <el-table-column label="名称">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="代码" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="有效" width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.valid ? '是':'否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.founder }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设置权限" width="200" align="center">
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                width="100%"
                trigger="click"
                @after-leave="afterEdit(scope.row)">
                <el-tree
                  :data="data"
                  :ref="scope.row.id"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps">
                </el-tree>
                <el-button size="mini" type="text" slot="reference" @click="beforeEdit(scope.row)">编辑</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
    </el-main>
  </el-container>
</template>

<script>
  import { getAuthorize, authorizeList, updateAuthorize, authorizeByUserType } from '@/api/authorize.js'
export default {
  name: 'JurisdictionManager',
  data() {
    return {
      listLoading: true,
      list: [],
      total: 0,
      classList: [],
      currentRow: null,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
  },
  methods: {
    onSubmit() {},
    initClassList() {
      this.classList = [
        { id:'1001', name: '一班'},
        { id:'1002', name: '二班'}
      ];
    },
    initData() {
      authorizeList().then(res => {
        const data = res.data
        for(let i = 0; i< data.length; i++) {
          this.list.push({
            id: data[i].Id,
            name: data[i].UserType,
            userType: data[i].UserType === '教师'? 0 : data[i].UserType === '学生' ? 1 : 2,
            valid: true,
            founder: '系统管理员',
            accessValues: []
          })
        }
        this.listLoading = false
      })
      getAuthorize().then(res => {
        console.log(res)
        const list = res.data
        for(let i = 0; i < list.length; i++) {
          this.data.push({
            id: list[i].accessValue,
            label: list[i].accessName,
            children: []
          })
        }
      })
    },
    addClick() {
      alert('新增')
    },
    handleClick(row) {
      alert('查看')
    },
    afterEdit(row) {
      const list = this.$refs[row.id].getCheckedKeys()
      if(row.accessValues.length === list.length && row.accessValues.filter(item => list.indexOf(item) === -1).length === 0) {
        return
      }
      updateAuthorize({ id: row.id, userAccess: this.$refs[row.id].getCheckedKeys() }).then(res => {
        row.accessValues = this.$refs[row.id].getCheckedKeys()
        this.$message({
          type: 'success',
          message: '修改权限成功'
        })
      })
    },
    async beforeEdit(row) {
      await authorizeByUserType(row.userType).then(res => {
        const authors = res.data;
        for(let i = 0; i < authors.length; i++) {
          row.accessValues.push(authors[i].AccessValue)
        }
      })
      await this.$refs[row.id].setCheckedKeys(row.accessValues);
    },
    query() {},
    handleCurrentChange() {}
  }
}
</script>

<style lang='scss' scoped>
  .el-container {
    .el-header {
      padding: 10px 10px 0 10px;
      display: flex;
      flex-flow: row-reverse;
      .el-button {
        margin-left: 10px;
      }
    }
    .el-main {
      padding: 10px;
    }
  }
  .secret-button {
    color: green;
  }
  .delete-button {
    color: red;
  }
</style>
