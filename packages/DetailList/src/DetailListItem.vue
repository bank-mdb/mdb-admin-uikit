<template>
  <div></div>
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
  render() {
    return (
      <el-col {...{ props: responsive[this.col] }}>
        <div class="label" v-bind:style="autoLabelWidth">
          {this.$props.label}
        </div>
        <div class="content">{this.$slots.default}</div>
      </el-col>
    );
  }
};
</script>

<style lang="scss" scoped></style>
