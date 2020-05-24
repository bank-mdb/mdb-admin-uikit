import {renderItemType, renderFormItemType} from "./utils/index";

export default {
  name: "dynamic-col",
  inject: ["fatherForm"],
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  beforeCreate(){
    let vm = this.$parent;
    // 拿到在dy-form组件中的局部组件
    while(vm && vm.$options._componentTag !== "dy-form") {
      vm = vm.$parent;
    }
    if(!vm) return;
    Object.assign(this.$options.components, vm.$options.components)
  },
  render: function(h) {
    let self = this;
    return h(
      "el-col",
      {
        props: {
          span:
            self.options.span ||
            (self.options.props && self.options.props.span) ||
            24
        }
      },
      [
        self.options.prop
          ? renderFormItemType(h, self.options, self)
          : renderItemType(h, self.options, self)
      ]
    );
  }
}