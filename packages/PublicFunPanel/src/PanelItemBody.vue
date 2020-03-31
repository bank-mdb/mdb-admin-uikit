<template>
  <div class="panel-item-body">
    <div class="text" @click="handleGoToPage">
      {{ content.id }} {{ content.title }}
    </div>
    <div class="icon" @click="handleCollected">
      <i
        :class="['el-icon-star-on', { isCollected: content.icon === 'true' }]"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "PanelItemBody",
  inject: ["publicFunPanel"],
  props: {
    content: Object
  },
  methods: {
    async handleCollected() {
      this.$emit(
        "collectionChange",
        this.content.id,
        this.content.icon === "true"
      );
    },
    handleGoToPage() {
      let [prefixFile = {}] = this.publicFunPanel.productPrefixFile.filter(
        item => this.content.id.includes(item.prefix)
      );
      if (prefixFile.publicPath === this.publicFunPanel.publicPath) {
        this.$router.push({ path: this.content.path });
      } else {
        let publicPath =
          prefixFile.publicPath === "/" ? "" : prefixFile.publicPath;
        window.location.href =
          window.location.origin + publicPath + this.content.path;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.panel-item-body {
  display: flex;
  width: 100%;
  height: 40px;
  padding-right: 22px;
  line-height: 38px;
  border-bottom: 1px solid #efeeee;
  .text {
    flex: 1;
    text-align: left;
    margin-right: 10px;
    font-family: PingFang SC;
    font-size: 14px;
    color: rgba(39, 39, 39, 0.9);
    cursor: pointer;
  }
  .icon {
    flex: 0 0 20px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    color: #edf3f8;
    .isCollected {
      color: #f2b663;
    }
  }
}
</style>
