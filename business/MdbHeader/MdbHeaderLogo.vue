<template>
  <div class="header-logo" @click="toHome">
    <svg-icon :icon-class="'ball'"></svg-icon>
    <div class="titleText">
      澳门发展银行<i class="iconfont mdb-dian1"></i>柜员平台
    </div>
  </div>
</template>
<script>
import routePath from "@/router/routePath";
export default {
  name: "HeaderLogo",
  methods: {
    toHome() {
      window.location.href = window.location.origin + routePath.home.path;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.header-logo {
  cursor: pointer;
  display: flex;
  margin-left: 30px;
  .titleText {
    color: #002e72;
    font-size: 18px;
    margin-left: 20px;
    line-height: 38px;
    i {
      // margin-right: 10px;
      font-size: 20px;
    }
  }
  svg {
    height: 38px;
    width: 38px;
  }
}
</style>
