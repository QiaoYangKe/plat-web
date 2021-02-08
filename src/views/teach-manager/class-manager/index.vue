<template>
  <el-container>
    <el-header height="auto">
      
      <el-button
        class="add-button"
        type="primary"
        icon="el-icon-plus"
        @click="addClick"
        >新增</el-button
      >
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
        <el-table-column align="center" label="班级">
          <template slot-scope="scope">
            {{ scope.row.className }}
          </template>
        </el-table-column>
        <el-table-column label="学生数">
          <template slot-scope="scope">
            {{ scope.row.count }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            {{ scope.row.note }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              @click="deleteClass(scope.row)"
              class="delete-button"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="班级信息"
        :visible.sync="dialogFormVisible"
        width="450px"
      >
        <el-form :model="form" size="small">
          <el-form-item label="班级名称" label-width="100px">
            <el-input
              v-model="form.className"
              autocomplete="off"
              style="width: 300px;"
            ></el-input>
          </el-form-item>

          <el-form-item label="备注" label-width="100px">
            <el-input
              v-model="form.note"
              type="textarea"
              style="width: 300px;"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="formSubmit">确 定</el-button>
        </div>
      </el-dialog>
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
  classInfoList,
  updateClass,
  addClass,
  classById,
  delClass
} from "@/api/class-info.js";
export default {
  name: "ClassManager",
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
    }
  },
  data() {
    return {
      listLoading: true,
      dialogFormVisible: false,
      list: [],
      total: 0,
      form: {},
      queryForm: {
        pageIndex: 1,
        pageSize: 10
      }
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      classInfoList(this.queryForm).then(res => {
        this.list = res.data;
        this.total = res.total;
        this.listLoading = false;
      });
    },
    addClick() {
      this.form = { className: "", note: "" };
      this.dialogFormVisible = true;
    },
    formSubmit() {
      if (this.form.id == null) {
        console.log(this.form);
        addClass(this.form).then(res => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.dialogFormVisible = false;
          this.query();
        });
      } else {
        updateClass(this.form).then(res => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.dialogFormVisible = false;
        });
      }
    },
    deleteClass(row) {
      this.$confirm("确认删除吗", "删除班级", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
        callback: action => {
          if (action === "confirm") {
            delClass(row.id).then(res => {
              this.query();
              this.$message({
                type: "success",
                message: "删除成功"
              });
            });
          }
        }
      });
    },
    handleClick(row) {
      this.form = row;
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  min-width: 1200px;
  .el-header {
    padding: 20px 35px 3px 35px;
    display: flex;
    flex-flow: row-reverse;
  }
  .el-main {
    padding: 10px 35px;
  }
}
.delete-button {
  color: red;
}
</style>
