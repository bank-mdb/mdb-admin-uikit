<!--
 * @Author: wulin
 * @Date: 2019-10-11 15:06:37
 * @Description: 登录界面
 -->
<template>
  <div class="login-container">
    <img class="login-bg-image  absolute-left" :src="bgloginleft" />
    <img class="login-bg-image absolute-right" :src="bgloginright" />
    <div class="login-page">
      <div class="logo-container">
        <div class="svg">
          <div class="svg-main">
            <svg-icon :icon-class="'logo_blue'"></svg-icon>
          </div>
        </div>
      </div>
      <h2 class="gray-text text-center">登录柜员平台</h2>
      <el-form
        ref="loginForm"
        :rules="rules"
        :model="loginFormModel"
        class="login-form"
      >
        <el-form-item prop="userName">
          <el-input
            ref="inputUser"
            v-model="loginFormModel.userName"
            clearable
            placeholder="请输入登录邮箱..."
          >
            <i slot="prefix" class="iconfont mdb-zhanghao"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="inputPassword"
            v-model="loginFormModel.password"
            type="password"
            placeholder="请输入登录密码..."
            maxlength="20"
            show-password
          >
            <i slot="prefix" class="iconfont mdb-mima"></i>
          </el-input>
        </el-form-item>

        <el-form-item
          prop="captcha"
          style="width:100%;margin-bottom: 10px;text-align: left;"
        >
          <el-input
            ref="captcha"
            style="width:160px;"
            v-model="loginFormModel.captcha"
            placeholder="请输入验证码..."
            maxlength="5"
            type="text"
            clearable
            @keyup.enter.native="handleLogin"
          >
          </el-input>
          <Captcha ref="captcha" class="captchas" />
        </el-form-item>
        <el-form-item style="margin-top:50px;">
          <el-button
            type="primary"
            class="submit-btn"
            :disabled="submitDisabled"
            :loading="submitLoading"
            @click.native.prevent="handleLogin"
            style="width:100%"
            >登录</el-button
          >
        </el-form-item>
        <div class="bottom-tools-bar">
          <span class="text-link" @click="toUrl">忘记密码? </span>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import Captcha from "@/components/business/Captcha";
import MTYPES from "@/store/mutation-types.js";
import store from "@/store";
import routePath from "@/router/routePath";
import Events from "@/bus/events.js";
export default {
  components: {
    Captcha
  },
  data() {
    return {
      submitLoading: false,
      bgloginleft: require("@/assets/login-bg-left.png"),
      bgloginright: require("@/assets/login-bg-right.png"),
      loginFormModel: {
        userName: "",
        password: "",
        captcha: "",
        captchaKey: "",
        code: ""
      },
      phoneVerlify: {
        key: "",
        mobile: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: "登录邮箱不能为空"
          },
          {
            type: "email",
            message: "邮件地址格式不正确",
            trigger: "blur"
          }
        ],
        password: {
          required: true,
          message: "登录密码不能为空"
        },
        captcha: {
          required: true,
          message: "验证码不能为空"
        },
        code: {
          required: true,
          message: "手机验证码不能为空"
        }
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    if (store.getters.isLogin) {
      next({ path: routePath.home.path });
    } else {
      //FIXED:用户信息清空
      store.commit(MTYPES.PERMISSION_MENU_TAB_BTN, []);
      next();
    }
  },
  mounted() {
    const lastUserName = this.$store.getters.lastUserName;
    if (lastUserName) {
      this.loginFormModel.userName = lastUserName;
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.submitLoading = true;
          this.loginFormModel.captchaKey = this.$refs.captcha.data.key;
          try {
            await this.$store.dispatch("USER_LOGIN", this.loginFormModel);
            this.$bus.emit(Events.LOGIN_STATUS_CHANGE);
            this.$router.push(routePath.home.path);
          } catch (error) {
            this.submitLoading = false;
            this.updateCaptcha();
          }
        } else {
          return false;
        }
      });
    },
    updateCaptcha() {
      this.$refs.captcha.updateCaptcha();
    },
    toUrl() {
      window.location.href = window.location.origin + "/public-fun/forget-pwd";
    }
  },
  computed: {
    submitDisabled() {
      return this.submitLoading;
    }
  }
};
</script>
<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: absolute;
  justify-content: center;
  background-color: #f9f9f9;
}
.login-page {
  width: 420px;
  height: 530px;
  background-color: #ffffff;
  box-shadow: 0px 4px 15px 0px rgba(38, 98, 150, 0.15);
  z-index: 20;
  margin-bottom: 100px;
}
.logo-container {
  width: 100%;
  padding: 25px 90px;
  .svg {
    flex: 1;
    .svg-main {
      cursor: pointer;
      display: flex;
      .titleText {
        line-height: 80px;
        color: #002e72;
        font-size: 28px;
        margin-left: 10px;
        i {
          margin-right: 10px;
          font-size: 32px;
        }
      }
      svg {
        height: 80px;
        width: 250px;
      }
    }
  }
}
.login-bg-image {
  position: absolute;
}
.absolute-left {
  left: 0;
  top: 0;
}
.absolute-right {
  right: 0;
  top: 0;
}
.el-form-item {
  color: #454545;
  width: 318px;
}
.text-center {
  text-align: center;
}
.login-form {
  margin-left: 50px;
}
.gray-text {
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 33px;
  letter-spacing: 0px;
  color: #404955;
  margin-bottom: 40px;
}
.captchas {
  text-align: right;
  margin-left: 18px;
  width: 140px;
  position: absolute;
  left: 159px;
  top: -2px;
  display: inline-block;
  z-index: 100;
}
.submit-btn {
  width: 100%;
}
.bottom-tools-bar {
  width: 318px;
  margin-top: -7px;
  margin-bottom: 60px;
  text-align: center;
}
.tools-text {
  font-family: PingFang SC;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 17px;
  letter-spacing: 0px;
  color: #3685f1;
  cursor: pointer;
}
.pull-right {
  float: right;
}
.counter {
  width: 130px;
  margin-left: 27px;
  margin-top: 30px;
}
</style>
<style lang="scss">
.login-container {
  .el-input__inner {
    background-color: #f5f9fc;
    border: 1px solid #f5f9fc;
  }
}
</style>
