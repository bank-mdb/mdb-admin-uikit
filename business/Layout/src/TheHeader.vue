<template>
  <div class="home-header" :style="{ height: height + 'px' }">
    <div class="header-main">
      <div class="header">
        <header-logo></header-logo>
        <header-user-center></header-user-center>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderLogo from "./HeaderLogo.vue";
import HeaderUserCenter from "./HeaderUserCenter.vue";
export default {
  name: "HomeHeader",
  components: { HeaderLogo, HeaderUserCenter },
  props: {
    height: {
      type: Number,
      default: 125
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.home-header {
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
