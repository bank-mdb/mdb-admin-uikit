//面包屑导航 ，缓存页面参数功能
/**
 * breadList = [
      { name: "", path: "", fullPath: "", meta: "", query: "", params: "" }
    ]
 */
import TYPES from "store/mutation-types";
const breadcrumb = {
  state: {
    breadList: []
  },
  mutations: {
    [TYPES.SET_BREADCRUMB](state, breadList) {
      state.breadList = breadList;
    }
  }
};

export default breadcrumb;
