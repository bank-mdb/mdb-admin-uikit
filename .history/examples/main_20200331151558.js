import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import MdbUIKit from "@/index.js";

Vue.use(MdbUIKit);
Vue.use(ElementUI);
console.log("MdbUIKit", MdbUIKit);
Vue.prototype.socrllToErrorMessageItem = MdbUIKit.socrllToErrorMessageItem;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
