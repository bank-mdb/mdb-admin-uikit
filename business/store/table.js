//列表设置动态列显示
import MTYPES from "store/mutation-types";
const message = {
  state: {
    dataColumn: []
  },
  mutations: {
    [MTYPES.DYNAMIC_COLUMN_SETTER]: (state, data) => {
      state.dataColumn = data;
    }
  }
};

export default message;
