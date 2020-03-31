import TreeSelect from "./TreeSelect/index.js";
import VTable from "./VTable/index.js";
import SearchForm from "./SearchForm/index.js";
import AdvancedTable from "./AdvancedTable/index.js";

//insert 型组件
// import PreviewFile from "./PreviewFile/index.js";

const components = [TreeSelect, VTable, SearchForm, AdvancedTable];

// eslint-disable-next-line no-unused-vars
const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  // PreviewFile,
  ...components
};
