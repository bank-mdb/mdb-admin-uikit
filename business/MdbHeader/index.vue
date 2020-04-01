<!--
 * @Author: xuweiming
 * @Date: 2019-06-14 17:47:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-12 18:20:30
 * @Description: file content
 -->
<template>
  <div
    class="home-header"
    :class="{ has_bread: !hideBread.includes($route.name) }"
  >
    <div class="header-main">
      <div class="header">
        <mdb-header-logo></mdb-header-logo>
        <mdb-header-user></mdb-header-user>
      </div>
    </div>
  </div>
</template>
<script>
import routePath from "@/router/routePath";
import MdbHeaderLogo from "./MdbHeaderLogo.vue";
import MdbHeaderUser from "./MdbHeaderUser.vue";
export default {
  name: "HomeHeader",
  components: { MdbHeaderLogo, MdbHeaderUser },
  data() {
    return {
      hideUser: [
        routePath.forgetPwd.name,
        routePath.initPwd.name,
        routePath.validatePhone.name
      ],
      hideBread: [routePath.home.name]
    };
  },
  computed: {
    isShowUser() {
      return !this.hideUser.includes(this.$route.name) && this.isLogin;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.home-header {
  // height: 85px;
  .header-main {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: #fff;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.07);
    .header {
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .bread {
      border-top: 1px solid #dfe8ef;
    }
  }
}
.has_bread {
  height: 125px;
}
</style>
