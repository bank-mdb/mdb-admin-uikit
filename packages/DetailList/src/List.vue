<template>
  <div
    :class="[
      'description-list',
      size,
      layout === 'vertical' ? 'vertical' : 'horizontal'
    ]"
  >
    <div v-if="title" class="title">{{ title }}</div>
    <el-row>
      <slot></slot>
    </el-row>
  </div>
</template>
<script>
const responsive = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 }
};
const Item = {
  name: "DetailListItem",
  props: {
    label: {
      type: String,
      default: "",
      required: false
    }
  },
  inject: ["col", "labelWidth"],
  computed: {
    autoLabelWidth() {
      return this.labelWidth ? { width: this.labelWidth + "px" } : "";
    }
  },
  render(h) {
    console.log("render: ", responsive[this.col]);

    return h("el-col", { props: responsive[this.col] }, [
      h("div", { style: this.autoLabelWidth }, this.$props.label),
      h("div", { class: "content" }, this.$slots.default)
    ]);
    // return h(
    //   <el-col {...{ props: responsive[this.col] }}>
    //     <div class="label" v-bind:style="autoLabelWidth">
    //       {this.$props.label}
    //     </div>
    //     <div class="content">{this.$slots.default}</div>
    //   </el-col>
    // );
  }
};

export default {
  name: "VDetailList",
  Item: Item,
  props: {
    title: {
      type: String,
      default: "",
      required: false
    },
    col: {
      type: Number,
      required: false,
      default: 3
    },
    size: {
      type: String,
      required: false,
      default: "large"
    },
    layout: {
      type: String,
      required: false,
      default: "horizontal"
    },
    labelWidth: {
      type: String,
      required: false
    }
  },
  provide() {
    return {
      col: this.col > 4 ? 4 : this.col,
      labelWidth: this.labelWidth
    };
  }
};
</script>
<style lang="scss">
.description-list {
  .title {
    color: #272727;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .label {
    color: #8c8c8c;
    display: inline-block;
    line-height: 20px;
    margin-right: 12px;
    padding-bottom: 16px;

    &:not(:empty):after {
      content: ":";
      margin: 0 8px 0 2px;
      position: relative;
      top: -0.5px;
    }
  }

  .content {
    color: #272727;
    display: inline;
    min-height: 22px;
    line-height: 22px;
    padding-bottom: 16px;
    &:empty {
      content: "";
      height: 38px;
      padding-bottom: 16px;
    }
  }
}
</style>
