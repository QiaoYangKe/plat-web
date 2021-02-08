<template>
  <div class="login-container">
    <div class="login-box">
      <el-image :src="require('@/assets/images/login-left.png')" style="width: 637px;height: 564px"></el-image>
      <span class="image-title">区块链教学平台</span>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">登录</h3>
        </div>
        <div class="title-bottom"></div>
        <el-form-item prop="userAccount">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
          <el-input
            ref="userAccount"
            v-model="loginForm.userAccount"
            placeholder="请输入账号"
            name="userAccount"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="passWord">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.passWord"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
          </el-form-item>
        </el-tooltip>

        <el-form-item prop="captchaCode">
          <span class="svg-container">
              <img :src="require('@/assets/images/code.png')"/>
          </span>
          <el-input
            v-model="loginForm.pathCode"
            placeholder="验证码"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            maxlength="4"
            style="height: 40px;width: 170px"
            @keyup.enter.native="checkCode"
          >
          </el-input>
          <div @click="refreshCode" style="float: right;">
            <Identify :identifyCode="identifyCode"></Identify>
          </div>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:336px;margin-bottom:30px;height: 45px" @click.native.prevent="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import Identify from '@/components/Identify'

export default {
  name: 'Login',
  components: { Identify },
  data() {
    return {
      loginForm: {
        userAccount: '',
        passWord: '',
        pathCode: ''
      },
      identifyCode: '',
      identifyCodes: '1234567890',
      loginRules: {
        userAccount: [{ required: true, trigger: 'blur',message: '请输入用户名' }],
        passWord: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        pathCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.userAccount === '') {
      this.$refs.userAccount.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    checkCode() {},
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 生成随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成四位随机验证码
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
          ]
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if(this.identifyCode !== this.loginForm.pathCode) {
            this.$message({
              type: 'warning',
              message: '验证码不正确'
            })
            return
          }
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#ffffff;
$light_gray:#666666;
$cursor: #666666;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  display: flex;
  height: 100%;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  .login-box {
    width: 1249px;
    height: 564px;
    display: flex;
    flex-flow: row;
  }
  .el-input {
    display: inline-block;
    height: 40px;
    width: 85%;

    input {
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      /*padding: 12px 5px 12px 15px;*/
      color: $light_gray;
      height: 38px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: 338px;
    height: 40px;
    background: white;
    border-radius: 3px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#ffffff;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  width: 100%;
  overflow: hidden;
  background-image: url('~@/assets/images/background_login.png');

  .login-form {
    background: white;
    position: relative;
    max-width: 100%;
    padding: 94px 138px 126px 138px;
    margin: 0;
    overflow: hidden;
    width: 612px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0 5px 0 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 28px;
      color: #2882fe;
      margin: 0 auto 9px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .image-title {
    position: absolute;
    font-size: 28px;
    color: white;
    margin: 15px 30px;
    font-weight: bold;
    letter-spacing: 3px;
  }

  .title-bottom {
    height: 5px;
    width: 80px;
    border-radius: 3px;
    margin:  0 auto 61px auto;
    background-color: #bdd8ff;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
