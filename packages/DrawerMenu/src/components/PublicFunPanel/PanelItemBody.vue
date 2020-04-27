<template>
  <div class="panel-item-body">
    <div class="text" @click="handleGoToPage(content)">{{ content.id }} {{ content.title }}</div>
    <div class="icon" @click="handleCollected">
      <i :class="['el-icon-star-on', { isCollected: content.icon === 'true' }]"></i>
    </div>
  </div>
</template>
<script>
import MTYPES from "@/store/mutation-types.js";
import path from "@/api/path";
export default {
  name: "PanelItemBody",
  props: {
    content: Object
  },
  inject: ["drawerProps"],
  methods: {
    async handleCollected() {
      if (this.content.icon === "true") {
        await this.$http.delete(
          path.CANCEL_COLLECTION.format({
            resCode: this.content.id
          })
        );
      } else {
        await this.$http.post(path.ADD_COLLECTION, {
          resCode: this.content.id
        });
      }
      await this.$store.dispatch(MTYPES.PERMISSION_MENU_TAB_BTN);
    },
    handleGoToPage(content) {
      let [prefixFile = {}] = this.drawerProps.productPrefixFile.filter(item =>
        content.id.includes(item.prefix)
      );
      let base = this.$router.options.base;
      base = base === "/" ? base : base.substr(0, base.length - 1);
      if (prefixFile.publicPath === base) {
        this.$router.push({ path: content.path });
      } else {
        let publicPath =
          prefixFile.publicPath === "/" ? "" : prefixFile.publicPath;
        window.location.href =
          window.location.origin + publicPath + content.path;
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
