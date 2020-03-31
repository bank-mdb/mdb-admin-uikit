<template>
  <div class="public-fun-panel">
    <PanelSearch v-on="$listeners"></PanelSearch>
    <div :style="{ height: `${panelHeight}px` }">
      <el-scrollbar :native="false" :noresize="false" tag="div">
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
export default {
  name: "PublicFunPanel",
  components: {
    PanelItem,
    PanelSearch
  },
  provide() {
    return {
      publicFunPanel: this
    };
  },
  props: {
    authMenuList: {
      type: Array,
      default: () => []
    },
    productPrefixFile: {
      type: Array,
      default: () => []
    },
    // vue.config文件里面配置的publicPath
    publicPath: {
      type: String,
      required: true,
      default: "/"
    },
    // 用于调整高度
    adjustHeight: {
      type: Number,
      default: 140
    }
  },
  data() {
    return {
      panelHeight: 0
    };
  },
  computed: {
    features() {
      let CollectedFeatures = this.authMenuList.filter(
        item => item.icon === "true"
      );
      const otherFeatures = this.productPrefixFile.map(prefixItem => {
        let filterFeatures = this.authMenuList.filter(item =>
          item.id.includes(prefixItem.prefix)
        );
        return {
          title: prefixItem.title,
          content: filterFeatures
        };
      });
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
      this.panelHeight =
        windowHeight -
        headerHeight -
        footerHeight -
        publicFunPanelSearchHeight -
        marginValue +
        this.adjustHeight;
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
<style lang="scss">
.public-fun-panel {
  width: 100%;
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .is-horizontal {
    display: none;
  }
}
</style>
