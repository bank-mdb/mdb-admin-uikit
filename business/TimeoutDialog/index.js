/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-03-08 11:38:41
 * @Description: 登陆无操作时退出登陆
 */

import Vue from "vue";
import TimeoutDialog from "./TimeoutDialog";

let dialog, initialization;
TimeoutDialog.newInstance = () => {
  let dialogConstructor = Vue.extend(TimeoutDialog);
  const data = {};
  data.onClose = function() {
    dialog = null;
  };
  const dialogInstance = new dialogConstructor({
    data: data
  });
  dialogInstance.vm = dialogInstance.$mount();
  dialogInstance.dom = dialogInstance.vm.$el;
  document.body.appendChild(dialogInstance.dom);
  return dialogInstance.vm;
};

initialization = function() {
  if (!dialog) {
    dialog = TimeoutDialog.newInstance();
  }
  return dialog;
};

export default initialization;
