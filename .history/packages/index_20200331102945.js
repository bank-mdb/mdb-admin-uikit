import TreeSelect from "./TreeSelect/index.js";
import VTable from "./VTable/index.js";
import SearchForm from "./SearchForm/index.js";
import AdvancedTable from "./AdvancedTable/index.js";
import {dyForm} from "./DyForm/index.js";

const components = [TreeSelect, VTable, SearchForm, AdvancedTable, dyForm];

console.log(dyForm)
// eslint-disable-next-line no-unused-vars
const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

//method 2 这样就写了大量重复的代码,利用 require.context 可以写成
// const path = require("path");
// const files = require.context("@/components/home", false, /\.vue$/);
// let modules = {};
// files.keys().forEach(key => {
//   const name = path.basename(key, ".vue");
//   modules[name] = files(key).default || files(key);
// });

// //Applications
// const components = modules;

/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components
};
