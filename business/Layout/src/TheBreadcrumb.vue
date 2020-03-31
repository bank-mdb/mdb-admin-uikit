/** 面包屑导航*/
<template>
  <div class="breadcrumb-con" v-if="isShowBreadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for="(item, index) in breadList">
        <el-breadcrumb-item v-if="item.meta.title" :key="index">
          <span @click="toLink(item.fullPath)">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
import MYTYPE from "@/store/mutation-types";
export default {
  name: "TheBreadcrumb",
  data() {
    return {
      breadList: []
    };
  },
  computed: {
    isShowBreadcrumb() {
      return this.breadList && this.breadList.length > 0;
    }
  },
  mounted() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      const curRouter = {
        path: this.$route.path,
        fullPath: this.$route.fullPath,
        meta: this.$route.meta
      };
      const isFirstLevelRouter = /\/list$/.test(curRouter.path);
      let matched = this.$store.state.breadcrumb.breadList;
      if (isFirstLevelRouter) {
        matched = [curRouter];
      } else {
        const indexOfRouter = matched.findIndex(
          item => item.path === curRouter.path
        );
        if (indexOfRouter !== -1) {
          matched = matched.splice(0, indexOfRouter);
        }
        if (curRouter.meta.title) {
          matched.push(curRouter);
        }
      }
      const isPublicPath = /^\/public-fun/.test(curRouter.path);
      if (isPublicPath) {
        matched = [];
      }
      this.$store.commit(MYTYPE.SET_BREADCRUMB, matched);
      this.breadList = matched;
    },
    toLink(path) {
      const tfArr = [
        /^\/business-info/,
        /^\/limit-/,
        /^\/merchant-/,
        /^\/product-set/,
        /^\/trade-finance-q/
      ];
      const epayArr = [
        /^\/acc-check-m/,
        /^\/acc-setl-q/,
        /^\/sign-m/,
        /^\/trans-q/
      ];
      let isTfApp = tfArr.some(tf => tf.test(path));
      let isEpayApp = epayArr.some(tf => tf.test(path));
      if (isTfApp) {
        this.$router.push(path);
      } else if (isEpayApp) {
        window.location.href = window.location.origin + "/ep" + path;
      } else {
        window.location.href = window.location.origin + path;
      }
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.breadcrumb-con {
  background: #fff;
  height: 40px;
  line-height: 40px;
  padding-left: 25px;
  display: flex;
  align-items: center;
  padding: 20px;
}
</style>
