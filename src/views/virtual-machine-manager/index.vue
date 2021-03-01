<template>
  <el-container>
    <el-header height="auto">
      <el-card>
        <div class="clear-fix">
          <span class="span-class">个人虚拟机</span>
        </div>
        <el-table
          v-loading="listLoading"
          v-if="ownList.length > 0"
          :data="ownList"
          element-loading-text="加载中"
          border
          fit
          :header-cell-style="{ background: '#eeeeee' }"
          tooltip-effect="light"
          highlight-current-row
        >
          <el-table-column label="名称" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.vmName }}
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <span>{{ vmTypes[scope.row.vmType] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.state === "关闭" ? "关闭" : "开启" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="系统" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.vmSystem }}</span>
            </template>
          </el-table-column>
          <el-table-column label="IP" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.vmip">{{ scope.row.vmip }}</span>
              <el-button
                v-else
                type="success"
                size="small"
                @click="getIpById(scope.row.id)"
                >获取IP</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="使用人" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="班级" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.className }}</span>
            </template>
          </el-table-column>
          <el-table-column label="端口号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.vncPort }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.creator }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间" align="center" width="200px">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | dateFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="350px" align="center">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="small"
                @click="runVm(scope.row)"
                :disabled="scope.row.state !== '关闭'"
                >运行</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="closeVm(scope.row)"
                :disabled="scope.row.state === '关闭'"
                >关闭</el-button
              >
              <el-button
                type="primary"
                size="small"
                @click="reStartVm(scope.row)"
                >重启</el-button
              >
              <!-- <el-button type="success" size="small" @click="showVm(scope.row)"
              >链接显示</el-button
            > -->
              <el-button type="danger" size="small" @click="delVm(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-button v-else type="primary" @click="selOwen(4)"
          >分配虚拟机</el-button
        >
      </el-card>
    </el-header>
    <el-main>
      <el-card>
        <div class="clear-fix">
          <span class="span-class">学生虚拟机</span>
        </div>
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
          <el-form-item>
            <el-select
              v-model="queryForm.classId"
              placeholder="请选择班级"
              clearable
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
            <el-button type="primary" @click="vmDistribution(0)"
              >分配虚拟机</el-button
            >
            <el-button type="primary" @click="vmDistribution(1)"
              >批量开启虚拟机</el-button
            >
            <el-button type="primary" @click="vmDistribution(3)"
              >批量关闭虚拟机</el-button
            >
            <el-button type="primary" @click="vmDistribution(2)"
              >获取IP</el-button
            >
          </el-form-item>
        </el-form>
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="加载中"
          border
          fit
          :header-cell-style="{ background: '#eeeeee' }"
          tooltip-effect="light"
          highlight-current-row
        >
          <el-table-column label="名称" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.vmName }}
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <span>{{ vmTypes[scope.row.vmType] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.state === "关闭" ? "关闭" : "开启" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="系统" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.vmSystem }}</span>
            </template>
          </el-table-column>
          <el-table-column label="IP" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.vmip">{{ scope.row.vmip }}</span>
              <el-button
                v-else
                type="success"
                size="small"
                @click="getIpById(scope.row.id)"
                >获取IP</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="使用人" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="班级" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.className }}</span>
            </template>
          </el-table-column>
          <el-table-column label="端口号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.vncPort }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.creator }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间" align="center" width="200px">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | dateFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="350px" align="center">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="small"
                @click="runVm(scope.row)"
                :disabled="scope.row.state !== '关闭'"
                >运行</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="closeVm(scope.row)"
                :disabled="scope.row.state === '关闭'"
                >关闭</el-button
              >
              <el-button
                type="primary"
                size="small"
                @click="reStartVm(scope.row)"
                >重启</el-button
              >
              <!-- <el-button type="success" size="small" @click="showVm(scope.row)"
              >链接显示</el-button
            > -->
              <el-button type="danger" size="small" @click="delVm(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="分配虚拟机"
          width="450px"
          :visible.sync="dialogFormVisible"
          :close="closeForm"
        >
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="班级" label-width="100px" prop="classId">
              <el-select
                v-model="form.classId"
                placeholder="请选择班级"
                style="width: 300px"
              >
                <el-option
                  v-for="item in classList"
                  :key="item.id"
                  :label="item.className"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="form.type === 0"
              label="虚拟机模板"
              label-width="100px"
              prop="vmInfoId"
            >
              <el-select
                v-model="form.vmInfoId"
                placeholder="请选择班虚拟机模板"
                style="width: 300px"
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
            <el-button @click="closeForm">取 消</el-button>
            <el-button type="primary" @click="bindGroupSubmit">确 定</el-button>
          </div>
        </el-dialog>
        <Pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryForm.pageIndex"
          :limit.sync="queryForm.pageSize"
          @pagination="query"
        />
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import {
  VMClone,
  VMInfoByUser,
  VMStart,
  VMStop,
  VMReboot,
  BatchVMStop,
  VMRemove,
  BatchStart
} from "@/api/vm-info.js";
import Pagination from "@/components/Pagination/index.vue";
import {
  templateList,
  CloneSpeed,
  GuestIP,
  GuestIPById,
  VmBindUser
} from "@/api/template-manager.js";
import { classInfoDic } from "@/api/class-info.js";
import { appConsts } from "@/appConsts";
import { CloneVm } from "@/api/vm-info";
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
    }
  },
  data() {
    return {
      listLoading: true,
      loading: null,
      dialogFormVisible: false,
      list: [],
      ownList: [],
      vmInfos: [],
      classList: [],
      vmTypes: appConsts.vmType,
      form: {
        classId: "",
        groupName: "",
        vmInfoId: "",
        userId: "",
        type: 0
      },
      total: 0,
      rules: {
        classId: [{ required: true, message: "请选择班级", trigger: "change" }],
        vmInfoId: [{ required: true, message: "请选择模板", trigger: "change" }]
      },
      queryForm: {
        pageIndex: 1,
        pageSize: 10,
        classId: "",
        userName: "",
        vmName: ""
      }
    };
  },
  mounted() {
    this.query();
    this.initClassList();
    this.initTemplate();
    this.ownListInit();
  },
  methods: {
    initClassList() {
      classInfoDic().then(res => {
        this.classList = res.data;
      });
    },
    getIpById(id) {
      GuestIPById({vmId: id}).then(res => {
        this.query();
        this.ownListInit();
      })
    },
    initTemplate() {
      templateList().then(res => {
        this.vmInfos = res.data;
      });
    },
    ownListInit() {
      CloneVm().then(res => {
        console.log(44, res.data);
        this.ownList = res.data;
      });
    },
    query() {
      VMInfoByUser(this.queryForm).then(res => {
        this.list = res.data;
        this.listLoading = false;
        this.total = res.total;
      });
    },
    closeForm() {
      this.dialogFormVisible = false;
      this.$refs.form.resetFields();
    },
    runVm(row) {
      VMStart({ vMId: row.id }).then(res => {
        this.$message({
          type: "success",
          message: "开启虚拟机"
        });
        row.state = "开启";
      });
    },
    closeVm(row) {
      VMStop({ vMId: row.id }).then(res => {
        this.$message({
          type: "success",
          message: "关闭虚拟机"
        });
        row.state = "关闭";
        this.query();
      });
    },
    vmDistribution(val) {
      this.dialogFormVisible = true;
      this.form.type = val;
    },
    selOwen(val) {
      this.form.type = val;
      this.bindGroupSubmit();
    },
    bindGroupSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.type === 0) {
            this.loading = this.$loading({
              lock: true,
              text: `请稍等，0%`,
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            VMClone(this.form).then(
              () => {
                this.loadPercent();
              },
              () => {
                this.$message({
                  type: "error",
                  message: "分配失败"
                });
                this.loading.close();
              }
            );
          } else if (this.form.type === 1) {
            this.loading = this.$loading({
              lock: true,
              text: `请稍等`,
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            BatchStart(this.form).then(() => {
              this.$message({
                type: "success",
                message: "开启成功"
              });
              this.loading.close();
              this.dialogFormVisible = false;
              this.query();
            });
          } else if (this.form.type === 2) {
            this.loading = this.$loading({
              lock: true,
              text: `请稍等`,
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            this.getIp();
          } else if (this.form.type === 3) {
            this.loading = this.$loading({
              lock: true,
              text: `请稍等`,
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            BatchVMStop(this.form).then(() => {
              this.$message({
                type: "success",
                message: "关闭成功"
              });
              this.dialogFormVisible = false;
              this.loading.close();
              this.query();
            });
          } else {
            getInfo().then(res => {
              this.form.userId = res.data.id;
              VmBindUser(this.form).then(() => {
                this.loading = this.$loading({
                  lock: true,
                  text: `请稍等，0%`,
                  spinner: "el-icon-loading",
                  background: "rgba(0, 0, 0, 0.7)"
                });
                VmBindUser(this.form).then(
                  () => {
                    this.loadPercent();
                  },
                  () => {
                    this.$message({
                      type: "error",
                      message: "分配失败"
                    });
                    this.loading.close();
                  }
                );
              });
            });
          }
        } else {
          return false;
        }
      });
    },
    getIp() {
      GuestIP({ classId: this.form.classId }).then(() => {
        this.$message({
          type: "success",
          message: "成功"
        });
        this.loading.close();
        this.query();
        this.dialogFormVisible = false;
      });
    },
    async loadPercent() {
      const sleep = time => {
        return new Promise(resolve => setTimeout(resolve, time));
      };
      await CloneSpeed().then(async res => {
        this.loading.setText(`请稍等，${res.data}%`);
        if (res.data !== "100") {
          await sleep(500);
          await this.loadPercent();
        } else {
          this.dialogFormVisible = false;
          this.loading.close();
          this.query();
          this.$message({
            type: "success",
            message: "成功"
          });
        }
      });
    },
    reStartVm(row) {
      VMReboot(row.id).then(res => {
        this.$message({
          type: "success",
          message: "重启虚拟机"
        });
      });
    },
    pouseVm(row) {
      VMSuspend(row.id).then(res => {
        this.$message({
          type: "success",
          message: "暂停虚拟机"
        });
      });
    },
    resumeVm(row) {
      VMResum(row.id).then(res => {
        this.$message({
          type: "success",
          message: "暂停虚拟机"
        });
      });
    },
    showVm(row) {},
    delVm(row) {
      VMRemove(row.id).then(res => {
        this.$message({
          type: "success",
          message: "删除虚拟机"
        });
        this.query();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  min-width: 1300px;
  .el-header {
    padding: 20px 35px 3px 20px;
    display: flex;
    flex-flow: column;
    .el-card {
      margin-right: -15px;
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
    .demo-form-inline {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
  .el-main {
    padding: 20px;
    .el-card {
      margin-bottom: 10px;
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
}
.secret-button {
  color: green;
}
.delete-button {
  color: red;
}
</style>
