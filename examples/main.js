import Vue from "vue"
import App from "./App.vue"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import MdbUIKit from "@/index.js"

Vue.use(MdbUIKit)
Vue.use(ElementUI)
// 对外暴露的方法如果常用的话可以添加到Vue原型链
// Vue.prototype.socrllToErrorMessageItem = MdbUIKit.socrllToErrorMessageItem;

Vue.config.productionTip = false

window.$globalHub = new Vue({
  render: h => h(App)
}).$mount("#app")
