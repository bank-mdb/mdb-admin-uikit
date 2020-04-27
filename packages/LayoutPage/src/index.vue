<template>
  <el-container class="app-wrapper">
    <el-header v-if="isShowHeader" height="70px">
      <mdb-header></mdb-header>
    </el-header>
    <el-main :style="{ padding: isFullPage ? '0px' : '0 20px' }">
      <breadcrumb v-if="hideBreadcrumb" class="app-main-bread"></breadcrumb>
      <router-view></router-view>
    </el-main>
    <el-footer height="60px">
      <the-footer></the-footer>
    </el-footer>
    <DrawerMenu></DrawerMenu>
  </el-container>
</template>
<script>
import MdbHeader from "mdb-teller-common/components/business/MdbHeader";
import TheFooter from "mdb-teller-common/components/business/TheFooter";
import DrawerMenu from "mdb-teller-common/components/business/DrawerMenu";
import Breadcrumb from "mdb-teller-common/components/business/Breadcrumb/index";
import routePath from "@/router/routePath";
import types from "@/store/mutation-types";
export default {
  components: {
    MdbHeader,
    TheFooter,
    DrawerMenu,
    Breadcrumb
  },
  computed: {
    isShowHeader() {
      const hideHeaderPath = [routePath.login.name];
      return !hideHeaderPath.includes(this.$route.name);
    },
    hideBreadcrumb() {
      const hidePage = ["^/login", "^/limit-", "^/job-", "^/sign-m"];
      const checkPath = path => {
        return new RegExp(path).test(this.$route.path);
      };
      const isHide = hidePage.some(checkPath);
      return !isHide;
    },
    isFullPage() {
      const pagePath = [routePath.login.name];
      return pagePath.includes(this.$route.name);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  .el-header {
    margin-bottom: 10px;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.06);
  }
  .el-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 60px;
  }
  .app-main-bread {
    margin-bottom: 10px;
  }
}
.code-container >>> .control {
  padding: 0;
  border: 0;
  background-color: #fff0;
}
</style>
