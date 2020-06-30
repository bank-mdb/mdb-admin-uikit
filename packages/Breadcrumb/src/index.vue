/** 面包屑导航*/
<template>
  <div class="breadcrumb-con" v-if="isShowBreadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for="(item, index) in breadList">
        <el-breadcrumb-item v-if="item.meta.title" :key="index">
          <span
            :class="index === breadList.length - 1 ? '' : 'link-point'"
            @click="toLink(item.fullPath, item.pulbicPath)"
            >{{ item.meta.title }}</span
          >
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      breadList: [],
    }
  },
  computed: {
    isShowBreadcrumb() {
      return this.breadList && this.breadList.length > 0
    },
  },
  mounted() {
    this.getBreadcrumb()
  },
  methods: {
    getPulbicPath() {
      return this.$router.options.base
    },
    getBreadcrumb() {
      let pulbicPath = this.getPulbicPath()
      const curRouter = {
        path: this.$route.path,
        fullPath: this.$route.fullPath,
        meta: this.$route.meta,
        pulbicPath: pulbicPath,
      }
      const isFirstLevelRouter = /\/list$/.test(curRouter.path)
      let matched
      let breadList = window.localStorage.getItem('breadList')
      if (breadList) {
        matched = JSON.parse(breadList)
      } else {
        matched = []
      }
      if (isFirstLevelRouter) {
        matched = [curRouter]
      } else {
        const indexOfRouter = matched.findIndex(
          (item) => item.path === curRouter.path
        )
        if (indexOfRouter !== -1) {
          matched = matched.splice(0, indexOfRouter)
        }
        if (curRouter.meta.title) {
          matched.push(curRouter)
        }
      }
      const isPublicPath = /^\/public-fun/.test(curRouter.path)
      if (isPublicPath) {
        matched = []
      }
      window.localStorage.setItem('breadList', JSON.stringify(matched))
      this.breadList = matched
    },
    toLink(path, toPulbicPath) {
      let currentPublicPath = this.getPulbicPath()
      if (currentPublicPath === toPulbicPath) {
        this.$router.push(path)
      } else {
        let toPath = toPulbicPath + path
        window.location.href =
          window.location.origin + toPath.replace('//', '/')
      }
    },
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    },
  },
}
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
.link-point {
  cursor: pointer;
}
</style>
