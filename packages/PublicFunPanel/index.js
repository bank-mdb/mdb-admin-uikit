import PublicFunPanel from "./src/index.vue";
PublicFunPanel.install = Vue =>
  Vue.component(PublicFunPanel.name, PublicFunPanel);
export default PublicFunPanel;
