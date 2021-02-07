<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <el-dialog
      title="个人信息"
      :visible.sync="dialogFormUserVisible"
      width="650px"
    >
      <el-form :model="userform" :inline="true" :rules="rules" ref="userform">
        <el-form-item label="名称" prop="userName">
          <el-input v-model="userform.userName" :style="inputWidth"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="userform.picture"
              :src="userform.picture"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select
            v-model="userform.sex"
            placeholder="请选择"
            :style="inputWidth"
          >
            <el-option label="男" :value="true"></el-option>
            <el-option label="女" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="userform.userType === 0" label="工号" prop="stuNo">
          <el-input
            disabled
            v-model="userform.stuNo"
            autocomplete="off"
            :style="inputWidth"
          ></el-input>
        </el-form-item>
        <el-form-item v-else-if="userform.userType === 1" label="学号" prop="stuNo">
          <el-input
            disabled
            v-model="userform.stuNo"
            autocomplete="off"
            :style="inputWidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input
            v-model="userform.phone"
            autocomplete="off"
            :style="inputWidth"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="userform.userType === 0" label="职称" prop="remarks">
          <el-input
            v-model="userform.remarks"
            autocomplete="off"
            :style="inputWidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input
            disabled
            v-model="userform.userAccount"
            autocomplete="off"
            :style="inputWidth"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="userform.userType === 1" label="班级" prop="classInfoId">
          <el-select
            disabled
            v-model="userform.classInfoId"
            placeholder="请选择"
            :style="inputWidth"
          >
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
        <el-button @click="cancelUser">取 消</el-button>
        <el-button type="primary" @click="submitUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="更改密码" :visible.sync="dialogFormVisible" width="480px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="原密码" label-width="130px">
          <el-input
            type="password"
            v-model="form.oldPassWord"
            :style="inputWidth"
          ></el-input>
        </el-form-item>

        <el-form-item label="新密码" label-width="130px">
          <el-input
            type="password"
            v-model="form.passWord"
            :style="inputWidth"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" label-width="130px">
          <el-input
            type="password"
            v-model="form.confirmPassWord"
            :style="inputWidth"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>
      <div class="right-menu-group">
        <!-- <el-button type="text" icon="el-icon-user-solid" class="button-style">{{
          name
        }}</el-button> -->
        <!-- <el-divider direction="vertical"></el-divider> -->
        <el-dropdown trigger="click" class="avatar-container">
          <div class="avatar-wrapper">
            <el-image :src="userform.picture" class="user-avatar"></el-image>
            {{ name }}
            <!-- <i class="el-icon-caret-bottom" /> -->
            <!-- <el-button type="text" class="button-style">操作中心</el-button> -->
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided @click.native="updateUserInfo">
              <span style="display:block;">个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="resetPassword">
              <span style="display:block;">更改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-divider direction="vertical"></el-divider>
        <el-button
          type="text"
          @click="logout"
          icon="el-icon-switch-button"
          class="button-style"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import store from "@/store";
import { updatePwd, updateUser, getInfo } from "@/api/user";
import { classInfoDic } from "@/api/class-info.js";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  data() {
    return {
      name: "",
      dialogFormVisible: false,
      dialogFormUserVisible: false,
      classList: [],
      form: {
        oldPassWord: "",
        passWord: "",
        confirmPassWord: ""
      },
      userform: {
        id: "",
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
      },
      inputWidth: { width: "250px", marginBottom: "20px" },
      rules: {
        oldPassWord: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        passWord: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        confirmPassWord: [
          { required: true, message: "请确认密码", trigger: "blur" }
        ],
        stuNo: [
          { required: true, message: "请输入工号/学号", trigger: "blur" }
        ],
        userAccount: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        userName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        phone: [
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: "请输入正确手机号",
            trigger: "blur"
          }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"])
  },
  mounted() {
    this.getName();
    getInfo().then(res => {
      this.$set(this, "userform", res.data);
    });
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.userform.picture = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //file对象
      console.log(file);
      const fr = new FileReader();
      //以dataUrl（base64）方式读取文件内容
      fr.readAsDataURL(file);
      //fr加载文件的回调
      fr.onload = e => {
        // dataurl地址，用来显示
        this.userform.picture = e.target.result;
        console.log("dataUrl---", e.target.result);
        // 从dataurl截取的base64，用来传数据
        console.log("base64---", e.target.result.replace(/^.*,(.*)$/, "$1"));

        // 看懂了否乔同学 哦哦
      };
      // 不用组件自带上传自己写上传逻辑
      return false;
      return isJPG && isLt2M;
    },
    getName() {
      this.name = store.getters.name;
    },
    initClassList() {
      classInfoDic().then(res => {
        this.classList = res.data;
      });
    },
    async updateUserInfo() {
      this.initClassList();
      await getInfo().then(res => {
        this.$set(this, "userform", res.data);
      });
      this.dialogFormUserVisible = true;
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updatePwd(this.form).then(() => {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.resetForm("form");
            this.dialogFormVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitUser() {
      this.$refs.userform.validate(valid => {
        if (valid) {
          updateUser(this.userform).then(() => {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.resetForm("userform");
            this.dialogFormUserVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.resetForm("form");
      this.dialogFormVisible = false;
    },
    cancelUser() {
      this.resetForm("userform");
      this.dialogFormUserVisible = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    resetPassword() {
      this.dialogFormVisible = true;
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 68px;
  height: 68px;
  line-height: 68px;
  text-align: center;
}
.avatar {
  width: 68px;
  height: 68px;
  display: block;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 10px;
    .right-menu-group {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      vertical-align: text-bottom;
      .button-style {
        font-size: 17px;
        cursor: pointer;
      }
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          :v-deep .el-image__inner {
            width: 40px;
            height: 40px;
            // 这怎么回事
          }
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
