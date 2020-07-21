<template>
  <div class="public-fun-panel">
    <PanelSearch v-on="$listeners"></PanelSearch>
    <div :style="{ height: `${panelHeight}px` }">
      <el-scrollbar :native="false" :noresize="false" tag="div">
        <div :style="{ maxHeight: `${panelHeight}px` }">
          <PanelItem
            :content="item.children"
            :hideEmptyItem="item.hideEmptyItem"
            :key="index"
            :title="item.title"
            v-for="(item, index) in menus"
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
    menus: {
      type: Array,
      default: () => []
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
