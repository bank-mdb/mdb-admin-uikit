/** 面包屑导航*/
<template>
  <div class="breadcrumb-con"
    v-if="isShowBreadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for="(item, index) in breadList">
        <el-breadcrumb-item :to="item.fullPath"
          v-if="item.meta.title"
          :key="index">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "breadcrumb",
  props: {
    appBreadList: {
      type: Array
    },
    setBread: {
      type: Function
    }
  },
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
      let matched = this.appBreadList;
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
      this.setBread(matched);
      // this.$store.commit(MYTYPE.SET_BREADCRUMB, matched);
      this.breadList = matched;
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
