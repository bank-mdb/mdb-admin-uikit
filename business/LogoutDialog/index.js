/*
 * @Author: wulin
 * @Date: 2019-09-18 10:28:14
 * @Description: file content
 */
import Vue from "vue";
import LogoutDialog from "./LogoutDialog";

let dialog, initialization;
LogoutDialog.newInstance = () => {
  let dialogConstructor = Vue.extend(LogoutDialog);
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
    dialog = LogoutDialog.newInstance();
  }
  return dialog;
};

export default initialization;
