<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-style">
    <el-tab-pane label="备份" name="first">
      <el-container>
        <el-header>
          <el-button type="primary">备份</el-button>
          <el-button type="primary">备份整库</el-button>
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
                {{ scope.row.studentNo }}
              </template>
            </el-table-column>
            <el-table-column label="姓名">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="班级" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.classNo }}</span>
              </template>
            </el-table-column>
            <el-table-column label="XXXX" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.noOne }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="handleClick(scope.row)">编辑</el-button>
                <el-button type="text" @click="handleClick(scope.row)" class="secret-button">重置密码</el-button>
                <el-button type="text" @click="handleClick(scope.row)" class="delete-button">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <Pagination v-show="total>0" :total="total" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="query" />
        </el-main>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="还原" name="second">
      <el-container>
        <el-header height="auto">
          <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="queryForm.classNo" placeholder="请选择班级">
                <el-option v-for="item in classList" :label="item.name" :key="item.id" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button class="add-button" type="primary" icon="el-icon-plus" @click="addClick">新增</el-button>
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
            <el-table-column align="center" label="学号">
              <template slot-scope="scope">
                {{ scope.row.studentNo }}
              </template>
            </el-table-column>
            <el-table-column label="姓名">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="班级" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.classNo }}</span>
              </template>
            </el-table-column>
            <el-table-column label="XXXX" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.noOne }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="handleClick(scope.row)">编辑</el-button>
                <el-button size="mini" type="text" @click="handleClick(scope.row)" class="secret-button">重置密码</el-button>
                <el-button size="mini" type="text" @click="handleClick(scope.row)" class="delete-button">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <Pagination v-show="total>0" :total="total" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="query" />
        </el-main>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="定时备份" name="third">
      <el-container>
        <el-header height="auto">
          <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="queryForm.classNo" placeholder="请选择班级">
                <el-option v-for="item in classList" :label="item.name" :key="item.id" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="queryForm.studentNo" placeholder="请输入学号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="queryForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button class="add-button" type="primary" icon="el-icon-plus" @click="addClick">新增</el-button>
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
            <el-table-column align="center" label="学号">
              <template slot-scope="scope">
                {{ scope.row.studentNo }}
              </template>
            </el-table-column>
            <el-table-column label="姓名">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="班级" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.classNo }}</span>
              </template>
            </el-table-column>
            <el-table-column label="XXXX" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.noOne }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="handleClick(scope.row)">编辑</el-button>
                <el-button type="text" @click="handleClick(scope.row)" class="secret-button">重置密码</el-button>
                <el-button type="text" @click="handleClick(scope.row)" class="delete-button">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <Pagination v-show="total>0" :total="total" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @pagination="query" />
        </el-main>
      </el-container>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    name: 'DataBackup',
    data() {
      return {
        activeName: 'second',
        listLoading: true,
        list: [],
        total: 0,
        classList: [],
        queryForm: {
          page: 1,
          limit: 10,
          classNo: undefined,
          name: undefined,
          studentNo: undefined
        }
      };
    },
    mounted() {
      this.initData()
      this.initClassList()
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {},
      initClassList() {
        this.classList = [
          { id:'1001', name: '一班'},
          { id:'1002', name: '二班'}
        ];
      },
      initData() {
        this.list = [
          { classNo: '10081', studentNo: '1001', name: '小明'}
        ]
        this.total = 1
        this.listLoading = false
      },
      addClick() {
        alert('新增')
      },
      query() {}
    }
  }
</script>
<style lang="scss" scoped>
  .tab-style {
    padding: 0;
    height: 100%;
    ::v-deep {
      .el-tabs__nav-scroll{
        padding-left: 20px;
      }
    }
    .el-tab-pane {
      height: 100%;
      .el-container{
        .el-aside{
          background: white;
          padding: 5px 20px;
          margin-right: -10px;
          height: 100%;
        }
        .el-main{
          padding: 5px 20px;
          height: 100%;
        }
        .leaning-main{
          display: flex;
          flex-flow: row;
          div {
            margin-right: 10px;
          }
        }
      }
      .clear-fix{
        margin: -10px 0 20px -10px;
        .span-class {
          display: flex;
          line-height: 16px;
        }
        .span-class::before {
          content: '';
          display: inline-block;
          width: 4px;
          background: #0a76a4;
          margin-right: 4px;
        }
      }
    }
  }
</style>
