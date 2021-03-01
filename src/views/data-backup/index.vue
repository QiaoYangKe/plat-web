<template>
  <el-tabs v-model="activeName" class="tab-style">
    <el-tab-pane label="备份" name="first">
      <el-container>
        <el-header>
          <el-button type="primary" @click="databack">备份</el-button>
          <el-button type="primary">备份整库</el-button>
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
            <el-table-column align="center" label="备份号">
              <template slot-scope="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>
            <el-table-column label="备份路径">
              <template slot-scope="scope">
                {{ scope.row.filePath }}
              </template>
            </el-table-column>
            <el-table-column label="备份时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="备份人" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="delData(scope.row.id)"
                  class="delete-button"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <Pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryForm.page"
            :limit.sync="queryForm.limit"
            @pagination="query"
          />
        </el-main>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="还原" name="second">
      <el-container>
        <el-header height="auto">
          <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="queryForm.classNo" placeholder="请选择班级">
                <el-option
                  v-for="item in classList"
                  :label="item.name"
                  :key="item.id"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="query">查询</el-button>
              <el-button
                class="add-button"
                type="primary"
                icon="el-icon-plus"
                @click="addClick"
                >新增</el-button
              >
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
            <el-table-column align="center" label="备份号">
              <template slot-scope="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>
            <el-table-column label="备份路径">
              <template slot-scope="scope">
                {{ scope.row.filePath }}
              </template>
            </el-table-column>
            <el-table-column label="备份时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="备份人" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="delData(scope.row.id)"
                  class="delete-button"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <Pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryForm.page"
            :limit.sync="queryForm.limit"
            @pagination="query"
          />
        </el-main>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="定时备份" name="third">
      <el-container>
        <el-header height="auto">
          <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="queryForm.classNo" placeholder="请选择班级">
                <el-option
                  v-for="item in classList"
                  :label="item.name"
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
              <el-button
                class="add-button"
                type="primary"
                icon="el-icon-plus"
                @click="addClick"
                >新增</el-button
              >
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
            <el-table-column align="center" label="备份号">
              <template slot-scope="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>
            <el-table-column label="备份路径">
              <template slot-scope="scope">
                {{ scope.row.filePath }}
              </template>
            </el-table-column>
            <el-table-column label="备份时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="备份人" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.userName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="delData(scope.row.id)"
                  class="delete-button"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <Pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryForm.page"
            :limit.sync="queryForm.limit"
            @pagination="query"
          />
        </el-main>
      </el-container>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { dataBackList, dataBackup, deleteData } from "@/api/data-back";
import Pagination from "@/components/Pagination/index.vue";
export default {
  name: "DataBackup",
  components: { Pagination },
  data() {
    return {
      activeName: "first",
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
    this.query();
    this.initClassList();
  },
  methods: {
    databack() {
      this.$confirm("确认备份吗？", "备份").then(() => {
        dataBackup().then(res => {
          this.$message({
            message: "备份成功",
            type: "success"
          });
          this.query();
        });
      });
    },
    delData(id) {
      let ids=[id]
      deleteData(ids).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.query();
      });
    },
    initClassList() {
      this.classList = [
        { id: "1001", name: "一班" },
        { id: "1002", name: "二班" }
      ];
    },
    query() {
      dataBackList(this.queryForm).then(res => {
        console.log(res.total)
        this.list = res.data;
        this.total = res.total;
        this.listLoading = false;
      });
    },
    addClick() {
      alert("新增");
    }
  }
};
</script>
<style lang="scss" scoped>
.delete-button {
  color: red;
}
.tab-style {
  padding: 0;
  height: 100%;
  ::v-deep {
    .el-tabs__nav-scroll {
      padding-left: 20px;
    }
  }
  .el-tab-pane {
    height: 100%;
    .el-container {
      .el-aside {
        background: white;
        padding: 5px 20px;
        margin-right: -10px;
        height: 100%;
      }
      .el-main {
        padding: 5px 20px;
        height: 100%;
      }
      .leaning-main {
        display: flex;
        flex-flow: row;
        div {
          margin-right: 10px;
        }
      }
    }
    .clear-fix {
      margin: -10px 0 20px -10px;
      .span-class {
        display: flex;
        line-height: 16px;
      }
      .span-class::before {
        content: "";
        display: inline-block;
        width: 4px;
        background: #0a76a4;
        margin-right: 4px;
      }
    }
  }
}
</style>
