<template>
  <div class="panel">
    <PanelSearch></PanelSearch>
    <div :style="{ height: `${panelHeight}px` }">
      <el-scrollbar
        wrapStyle="color:'#dde2e8'"
        viewStyle="color:'#dde2e8'"
        :native="false"
        :noresize="false"
        tag="div"
      >
        <div :style="{ maxHeight: `${panelHeight}px` }">
          <PanelItem
            v-for="(item, index) in features"
            :key="index"
            :title="item.title"
            :content="item.content"
            :hideEmptyItem="item.hideEmptyItem"
            v-on="$listeners"
          ></PanelItem>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import PanelItem from "./PanelItem.vue";
import PanelSearch from "./PanelSearch.vue";
// import { mapState } from "vuex";
// import routePath from '@/router/routePath'
export default {
  name: "PublicFunPanel",
  components: {
    PanelItem,
    PanelSearch
  },
  props: {
    isPublicHomePage: {
      type: Boolean,
      default: false
    }
  },
  inject: ["drawerProps"],
  data() {
    return {
      panelHeight: 0
    };
  },
  computed: {
    features() {
      let CollectedFeatures = this.drawerProps.authMenuList.filter(
        item => item.icon === "true"
      );
      const otherFeatures = this.drawerProps.productPrefixFile.map(
        prefixItem => {
          let filterFeatures = this.drawerProps.authMenuList.filter(item =>
            item.id.includes(prefixItem.prefix)
          );
          return {
            title: prefixItem.title,
            content: filterFeatures
          };
        }
      );
      return [
        {
          title: "我的收藏",
          content: CollectedFeatures,
          hideEmptyItem: false
        },
        ...otherFeatures
      ];
    }
  },
  methods: {
    handleResize() {
      const windowHeight = window.innerHeight;
      const headerHeight = 70;
      const footerHeight = 90;
      const marginValue = 15;
      const publicFunPanelSearchHeight = 90;
      let panelHeight =
        windowHeight -
        headerHeight -
        footerHeight -
        publicFunPanelSearchHeight -
        marginValue;
      //TODO:TEST
      this.panelHeight = panelHeight;
      // this.panelHeight =
      //   this.$route.path === routePath.home.path
      //     ? panelHeight
      //     : panelHeight + 120
    }
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>
<style lang="scss" scoped>
.panel {
  width: 100%;
}
</style>

<style lang="scss">
.panel {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
