<template>
  <div class="panel-item" v-if="!(content.length === 0 && hideEmptyItem)">
    <PanelItemHeader
      :title="title"
      :isSearch="isSearch"
      v-on="$listeners"
      @handleShowMore="handleClose"
    ></PanelItemHeader>
    <el-collapse-transition>
      <div class="body-wrapper" v-if="(isShowMore && !isSearch) || isSearch">
        <PanelItemBody
          v-for="item in content"
          :content="item"
          :key="item.id"
          v-on="$listeners"
        ></PanelItemBody>
        <div v-if="content.length === 0 && !isSearch" class="empty">
          暂无收藏
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import PanelItemHeader from "./PanelItemHeader.vue";
import PanelItemBody from "./PanelItemBody.vue";
export default {
  name: "PanelItem",
  components: {
    PanelItemBody,
    PanelItemHeader
  },
  props: {
    title: String,
    content: Array,
    isSearch: {
      type: Boolean,
      default: false
    },
    hideEmptyItem: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShowMore: true
    };
  },
  methods: {
    handleClose(isShowMore) {
      this.isShowMore = isShowMore;
    }
  }
};
</script>
<style lang="scss" scoped>
.panel-item {
  .body-wrapper {
    padding-right: 8px;
    .empty {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #8492a6;
    }
  }
}
</style>
