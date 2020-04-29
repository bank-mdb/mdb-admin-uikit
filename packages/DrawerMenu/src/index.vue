<template>
  <Drawer
    v-if="isShow"
    class="drawer-menu-container"
    ref="drawer"
    :openDrawer="openDrawer"
    controlOffset="40vh"
    contentSize="400px"
    :controls="controls"
  >
    <!-- float-button -->
    <template v-slot:control="{ drawer }">
      <div
        v-if="drawer.control.key === 'look'"
        v-show="drawer.show === false"
        class="float-button"
      >
        <i class="iconfont mdb-caidandaohang"></i>功能导航
      </div>
    </template>
    <!-- content -->
    <div class="mg-20">
      <span class="text-title">
        <i class="iconfont mdb-caidandaohang" style="color:#3685f1"></i>
        功能导航
      </span>
      <span class="text-gray-fun float-right" @click="hideDrawer">
        收起
        <i class="el-icon-arrow-right"></i>
      </span>
    </div>
    <!-- 菜单 -->
    <PublicFunPanel
      class="mgr-20"
      style="padding-left:20px;"
      ref="Panel"
    ></PublicFunPanel>
  </Drawer>
</template>

<script>
import Drawer from '../../Drawer/src/index.vue'
import PublicFunPanel from './components/PublicFunPanel'
export default {
  components: {
    Drawer,
    PublicFunPanel,
  },
  props: {
    isLogin: {
      type: String,
    },
    authMenuList: {
      type: Array,
    },
    productPrefixFile: {
      type: Array,
    },
  },
  provide() {
    return {
      drawerProps: this,
    }
  },
  data() {
    return {
      controls: [
        {
          key: 'look',
          show: '功能导航',
          hidden: '',
        },
      ],
    }
  },
  methods: {
    openDrawer() {
      return true
    },
    hideDrawer() {
      this.$refs.drawer.closeDrawerByControl()
    },
  },
  computed: {
    // isLogin() {
    //   return this.$store.getters.isLogin;
    // },
    isShow() {
      const onlyShowList = /\/list$/
      return this.isLogin && onlyShowList.test(this.$route.path)
    },
  },
}
</script>

<style lang="scss" scoped>
.drawer-menu-container {
  overflow: hidden;
  height: 150px;
  position: absolute;
  .text-title {
    font-size: 15px;
    color: #272727;
    opacity: 0.9;
    font-weight: initial;
  }
  .float-right {
    float: right;
  }
  .text-gray-fun {
    color: #8492a6;
    opacity: 0.9;
    cursor: pointer;
  }
  .mg-bottom-15 {
    margin-bottom: 15px;
  }
  .mg-20 {
    margin: 15px 20px;
  }
  .float-button {
    width: 36px;
    height: 150px;
    writing-mode: vertical-rl;
    padding: 12px 12px;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 8px;
    background-color: #3685f1;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  }
  .visible {
    visibility: hidden;
  }
}
</style>
