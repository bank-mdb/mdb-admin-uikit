import TreeSelect from './TreeSelect/index.js'
import VTable from './VTable/index.js'
import SearchForm from './SearchForm/index.js'
import AdvancedTable from './AdvancedTable/index.js'
import form from './DyForm/index.js'
import { socrllToErrorMessageItem } from './DyForm/src/utils/index.js'
import { validateForms } from './DyForm/src/utils/index.js'
import PublicFunPanel from './PublicFunPanel/index.js'
import Drawer from './Drawer/index.js'
import DetailList from './DetailList/index.js'
import Breadcrumb from './Breadcrumb/index.js'
import DrawerMenu from './DrawerMenu/index.js'
const components = [
  TreeSelect,
  VTable,
  SearchForm,
  AdvancedTable,
  form.dyForm,
  PublicFunPanel,
  Drawer,
  DetailList,
  Breadcrumb,
  DrawerMenu,
]

// eslint-disable-next-line no-unused-vars
const install = function(Vue, opts = {}) {
  components.map((component) => {
    Vue.component(component.name, component)
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  nonRenderFormItem: form.nonRenderFormItem,
  socrllToErrorMessageItem,
  validateForms,
  ...components,
}
