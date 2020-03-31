import dyForm from "./src/index.vue";
import nonRenderFormItem from "./src/nonRenderFormItem";

dyForm.install = Vue => Vue.component(dyForm.name, dyForm)

export default {dyForm, nonRenderFormItem};