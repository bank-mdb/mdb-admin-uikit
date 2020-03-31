import axios from "axios";
import { VueAxios } from "./axios.js";
import { Message } from "element-ui";
import store from "../store";
import router from "../router/index";
import routePath from "../router/routePath";
import MTYPES from "../store/mutation-types";
import Config from "../config/config";
import xss from "xss";
import { replacePropertiesQuotation } from "@/utils/util";
import LoginInterceptors from "mdb-admin-uikit/business/TimeoutDialog/LoginInterceptors.js";
import PATH from "@/api/path.js";
const service = axios.create({
  baseURL: "",
  timeout: 30000
});
service.interceptors.request.use(
  config => {
    Object.assign(
      config.headers,
      {
        "Content-Type": "application/json",
        app: Config.platform,
        "X-Requested-With": "XMLHttpRequest"
      },
      store.getters.token
    );
    config.params = {
      _t: new Date().getTime(),
      ...config.params
    };
    if (config.data) {
      config.data = replacePropertiesQuotation(config.data);
    }
    xss(config);
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// 特定错误码、特定url不弹错误消息窗口
const isShowErrMsg = (errCode, url) => {
  const errCodes = ["WO4003"];
  const urls = [PATH.SYNC_NEW_SEND_RECORD];
  return !(errCodes.includes(errCode) || urls.includes(url));
};

service.interceptors.response.use(
  response => {
    const res = response.data || response.result;

    if (response.config.url.match(new RegExp("^/yapi/.*$"))) {
      return res;
    }
    //add:用户10分钟未操作
    LoginInterceptors();
    if (res.retCode !== "0000") {
      switch (res.retCode) {
        case "1403":
        case "8006":
          store.commit(MTYPES.SET_LOGIN, false);
          store.commit("SET_USER_TOKEN", null);
          router.push(routePath.login);
          break;
      }
      const errorMsg = res.retMsg;
      if (isShowErrMsg(res.retCode, response.config.url) && errorMsg) {
        Message.error({ message: errorMsg, duration: 5000 });
      }
      return Promise.reject(res);
    }
    return res;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          error.message = "未授权，请重新登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求出错";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时,请重试尝试";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
          error.message = `连接出错(${error.response.status})!`;
      }
    } else {
      error.message = "连接服务器失败!";
    }
    Message.error(error.message);
    return Promise.reject(error);
  }
);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service);
  }
};

export { installer as VueAxios, service as axios };
