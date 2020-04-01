/*
 * @Author: wulin
 * @Date: 2019-09-19 09:49:19
 * @Description: 页面长时间未操作，执行退出当登录
 */
import store from "@/store";
import TimeoutDialog from "./index";
import { setInterval, clearInterval } from "timers";
let timeoutTimer = null;
const LATEST_LOGIN_TIME = "LATEST_LOGIN_TIME";
const refreshLoginTime = () => {
  if (!window.localStorage) {
    console.warn("浏览器不支持localStorage");
  } else {
    window.localStorage.setItem(LATEST_LOGIN_TIME, new Date().getTime());
  }
};
const clearTimerInterval = () => {
  if (timeoutTimer) {
    clearInterval(timeoutTimer);
  }
};
const getLatestLoginTime = () => {
  if (!window.localStorage) {
    console.warn("浏览器不支持localStorage");
    clearTimerInterval();
    return new Date().getTime() + 10000;
  } else {
    return window.localStorage.getItem(LATEST_LOGIN_TIME);
  }
};
if (window.document) {
  const body = window.document.querySelector("html");
  body.addEventListener("click", refreshLoginTime);
  body.addEventListener("keydown", refreshLoginTime);
  body.addEventListener("mousemove", refreshLoginTime);
  body.addEventListener("mousewheel", refreshLoginTime);
}
const Interceptors = () => {
  clearTimerInterval();
  if (store.getters.isLogin) {
    refreshLoginTime();
    const unDoTimeout = store.getters.countDownTime * 1000;
    timeoutTimer = setInterval(() => {
      if (store.getters.isLogin === false) {
        clearTimerInterval();
        return;
      }
      let lastTime = getLatestLoginTime();
      if (new Date().getTime() - lastTime > unDoTimeout) {
        clearTimerInterval();
        TimeoutDialog();
      }
    }, 1000);
  }
};
export default Interceptors;
