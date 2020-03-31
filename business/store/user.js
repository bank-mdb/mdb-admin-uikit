import { axios } from "@/api/index";
import path from "@/api/path";
import { hexMd5 } from "@/utils/util";
import types from "store/mutation-types";

const user = {
  state: {
    isLogin: false,
    customerPlatformInfo: {}, // 客户基础平台资料
    countDownTime: 1560, // 失效有效时间为27分钟
    openServiceEntity: {}, // 贸易服务开通实体
    createAccountEntity: {}, // 新创建账号实体
    lastUserName: "", //最后一次登录用户名
    unReadMsgCount: 0,
    userToken: {
      // Authorization: "",
      // Ref_Authorization: "",
      // lutMdb: ""
    }
  },
  getters: {
    isLogin: state => {
      return state.userToken["Authorization"];
    },
    userInfo: state => state.customerPlatformInfo,
    lastUserName: state => state.lastUserName,
    countDownTime: state => state.countDownTime,
    unreadMsgCount: state => state.unReadMsgCount,
    token: state => {
      if (state.userToken) {
        return state.userToken;
      }
      return {};
    }
  },
  mutations: {
    SET_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_CUSTOMER_PLATFORM_INFO: (state, info) => {
      state.customerPlatformInfo = info;
    },
    SET_COUNT_DOWN_TIME: (state, info) => {
      state.countDownTime = info;
    },
    SET_OPEN_SERVICE_ENTITY: (state, info) => {
      state.openServiceEntity = info;
    },
    SET_CREATE_ACCOUNT_ENTITY: (state, info) => {
      state.createAccountEntity = info;
    },
    SET_LAST_USERNAME: (state, value) => {
      state.lastUserName = value;
    },
    SET_UNREAD_MSG_COUNT: (state, value) => {
      state.unReadMsgCount = value;
    },
    SET_USER_TOKEN: (state, value) => {
      if (!value) {
        state.userToken = {};
      } else {
        state.userToken["Authorization"] = value.accessToken || "";
        state.userToken["Ref_Authorization"] = value.refreshToken || "";
        state.userToken["lutMdb"] = value.lutMdb || "";
      }
    }
  },
  actions: {
    async USER_LOGIN({ dispatch, commit }, params) {
      commit("SET_LAST_USERNAME", params.userName); //记住用户名
      let copy = Object.assign({}, params);
      copy["password"] = hexMd5(params["password"]);
      let { data } = await axios.post(path.USER_LOGIN, copy);
      commit("SET_USER_TOKEN", data.tokenVo);
      const countDownTime = (data && data.countDownTime) || 1560;
      commit("SET_COUNT_DOWN_TIME", countDownTime);

      await dispatch("GET_USER_INFO");
      await dispatch(types.PERMISSION_MENU_TAB_BTN);
      commit(types.DYNAMIC_COLUMN_SETTER, "");
      commit(types.SET_LOGIN, true);
    },
    // 获取客户基础平台资料
    async GET_USER_INFO({ commit }) {
      let res = await axios.get(path.USER_LOGIN_INFO);
      commit(types.SET_CUSTOMER_PLATFORM_INFO, res.data);
    },
    // 获取客户基础平台资料
    async getCustomerPlatformInfo({ commit }) {
      let res = await axios.get(path.USER_LOGIN_INFO);
      commit("SET_CUSTOMER_PLATFORM_INFO", res.data);
    },
    // 刷新 token
    REFRESH_TOKEN({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .post(path.REFERSH_TOKEN)
          .then(res => {
            //TODO
            console.log("REFERSH_TOKEN res: ", res);
            commit("SET_USER_TOKEN", res);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 获取用户未读消息
    async GET_USER_MESSAGE({ commit }) {
      const { data } = await axios.post(path.SYNC_NEW_SEND_RECORD);
      commit(types.SET_UNREAD_MSG_COUNT, data.unReadCount);
    },
    /** 退出登陆 */
    USER_LOGOUT({ commit, state }) {
      return new Promise(resolve => {
        let userInfo = state.customerPlatformInfo || {};
        if (!userInfo["userId"]) {
          resolve();
          return;
        }
        let url = path.LOG_OUT.format({ userId: userInfo.userId });
        axios.get(url).then(() => {
          //清除用户信息,权限
          commit(types.SET_LOGIN, false);
          commit(types.SET_CUSTOMER_PLATFORM_INFO, {});
          commit(types.PERMISSION_MENU_TAB_BTN, []);
          commit("SET_USER_TOKEN", null);
          resolve();
        });
      });
    }
  }
};

export default user;
