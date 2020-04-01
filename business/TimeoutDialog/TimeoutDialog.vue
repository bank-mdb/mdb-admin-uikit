<!--
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-03-09 10:42:41
 * @Description: 业务超时未操作提示
 -->
<template>
  <el-dialog
    custom-class="base-dialog logout-dialog"
    title="提示"
    :visible.sync="visible"
    center
    :close-on-click-modal="false"
    width="550px"
    :show-close="false"
  >
    <div class="text-center">
      <h1>{{ logoutTxt }}</h1>
      <div>页面长时间未操作，退出当前登录？</div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="refreshLogin">不退出</el-button>
      <el-button @click="toHome">退出</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { setInterval, clearInterval } from "timers";
import types from "@/store/mutation-types";
import store from "@/store";
import Event from "@/bus/events.js";
import router from "@/router";
import routePath from "@/router/routePath";
export default {
  name: "LogoutDialog",
  data() {
    return {
      visible: true,
      logoutTxt: "03:00",
      timeoutInteverObj: null,
      onClose: null
    };
  },
  mounted() {
    this.countDown(3, 0);
    //this.$bus.emit(Event.CLOSE_ALL_DIALOG);
  },
  methods: {
    countDown(munite, second) {
      let m = munite;
      let s = second;
      let m2, s2;
      let _this = this;
      this.safeClearInterval();
      this.timeoutInteverObj = setInterval(function() {
        s--;
        if (s < 0) {
          s = 60;
          m--;
          if (m < 0) {
            _this.logoutTxt = "00:00";
            _this.safeClearInterval();
            _this.toHome();
            return;
          }
        }
        m2 = m < 10 ? "0" + m : m;
        s2 = s < 10 ? "0" + s : s;
        _this.logoutTxt = m2 + ":" + s2;
      }, 1000);
    },
    refreshLogin() {
      this.safeClearInterval();
      const handle = () => {
        this.$bus.emit(Event.LOGIN_STATUS_CHANGE);
        location.reload();
        this.close();
      };
      store
        .dispatch(types.REFRESH_TOKEN)
        .then(handle)
        .catch(handle);
    },
    toHome() {
      this.safeClearInterval();
      store.dispatch("USER_LOGOUT").then(() => {
        router.replace(routePath.login.path);
        this.close();
      });
    },
    safeClearInterval() {
      if (this.timeoutInteverObj) {
        clearInterval(this.timeoutInteverObj);
      }
    },
    close() {
      this.visible = false;
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
      this.safeClearInterval();
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>
<style lang="postcss" scoped>
h1 {
  letter-spacing: 0px;
  color: #3685f1;
  margin-bottom: 10px;
}
.text-center {
  text-align: center;
}
</style>
