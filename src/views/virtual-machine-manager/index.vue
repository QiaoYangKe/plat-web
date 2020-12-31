<template>
  <el-container>
    <el-header height="auto">
      <el-form
        :inline="true"
        :model="queryForm"
        class="demo-form-inline"
        size="small"
      >
        <el-form-item>
          <el-select v-model="queryForm.classInfoId" placeholder="请选择班级">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.className"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="queryForm.userName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="queryForm.vmName"
            placeholder="请输入实例名称"
          ></el-input>
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
        size="small"
        tooltip-effect="light"
        highlight-current-row
      >
        <el-table-column label="名称" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.vmInfo.vmName }}
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.vmInfo.vmType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="系统" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.vmInfo.vmSystem }}</span>
          </template>
        </el-table-column>
        <el-table-column label="端口号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.vmInfo.vncPort }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.vmInfo.userInfo.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.vmInfo.createTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="600px" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="runVm(scope.row)"
              >运行</el-button
            >
            <el-button type="danger" size="small" @click="closeVm(scope.row)"
              >关闭</el-button
            >
            <el-button type="primary" size="small" @click="reStartVm(scope.row)"
              >重启</el-button
            >
            <el-button type="primary" size="small" @click="pouseVm(scope.row)"
              >暂停</el-button
            >
            <el-button type="primary" size="small" @click="resumeVm(scope.row)"
              >恢复</el-button
            >
            <el-button type="success" size="small" @click="showVm(scope.row)"
              >链接显示</el-button
            >
            <el-button type="danger" size="small" @click="delVm(scope.row)"
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
import {
  VMClone,
  GuestIP,
  VMInfoByUser,
  VmById,
  VMStart,
  VMStop,
  VMDestroy,
  VMSuspend,
  VMResum,
  VMReboot,
  VMRemove,
  VMRebootHost,
  VMRebootNet,
  VMStatusQuery,
} from "@/api/vm-info.js";
import Pagination from "@/components/Pagination/index.vue";
export default {
  name: "VirtualMachineManager",
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
      list: [],
      total: 0,
      queryForm: {
        pageIndex: 1,
        pageSize: 10,
        classInfoId: undefined,
        userName: undefined,
        vmName: undefined,
      },
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      VMInfoByUser(this.queryForm).then((res) => {
        this.list = res.data;
        this.listLoading = false;
        this.total = res.total;
      });
    },
    runVm(row) {
      VMStart({ vMId: row.id }).then((res) => {
        this.$message({
          type: "success",
          message: "开启虚拟机",
        });
      });
    },
    closeVm(row) {
      VMStop({ vMId: row.id }).then((res) => {
        this.$message({
          type: "success",
          message: "关闭虚拟机",
        });
      });
    },
    reStartVm(row) {
      VMReboot(row.id).then((res) => {
        this.$message({
          type: "success",
          message: "重启虚拟机",
        });
      });
    },
    pouseVm(row) {
      VMSuspend(row.id).then((res) => {
        this.$message({
          type: "success",
          message: "暂停虚拟机",
        });
      });
    },
    resumeVm(row) {
      VMResum(row.id).then((res) => {
        this.$message({
          type: "success",
          message: "暂停虚拟机",
        });
      });
    },
    showVm(row) {},
    delVm(row) {
      VMRemove(row.id).then((res) => {
        this.$message({
          type: "success",
          message: "删除虚拟机",
        });
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.el-container {
  .el-header {
    padding: 20px 35px 3px 20px;
    display: flex;
    flex-flow: row;
    .demo-form-inline {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
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
