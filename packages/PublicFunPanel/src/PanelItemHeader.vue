<template>
  <div :class="['panel-item-header', { isSearch }]">
    <div class="text">
      {{ title }}
    </div>
    <div class="icon" @click="handleShowMore">
      <span v-if="isSearch">关闭</span>
      <span v-if="!isSearch">{{ isShowMore ? "收起" : "展开" }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "PanelItemHeader",
  props: {
    title: String,
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowMore: true
    };
  },
  methods: {
    handleShowMore() {
      this.isShowMore = !this.isShowMore;
      this.$emit("handleShowMore", this.isShowMore);
    }
  }
};
</script>
<style lang="scss" scoped>
.panel-item-header {
  display: flex;
  padding-top: 5px;
  width: 100%;
  height: 60px;
  padding-right: 22px;
  line-height: 60px;
  .text {
    flex: 1;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: bolder;
    color: #272727;
  }
  .icon {
    font-family: PingFang SC;
    font-size: 12px;
    color: #8492a6;
    opacity: 0.9;
    cursor: pointer;
  }
}
</style>
