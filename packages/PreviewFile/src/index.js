import Vue from "vue";
import main from "./PreviewFile.vue";

const previewConstructor = Vue.extend(main);
let previewInstance = null;
const PreviewImage = options => {
  options = options || {};
  if (typeof options === "string") {
    options = {
      url: options
    };
  }

  if (previewInstance === null) {
    options.onClose = function() {
      PreviewImage.close();
    };
    previewInstance = new previewConstructor({
      data: options
    });
    previewInstance.vm = previewInstance.$mount();
    previewInstance.dom = previewInstance.vm.$el;
    previewInstance.vm.visible = true;
    document.body.appendChild(previewInstance.dom);
  }
  return previewInstance.vm;
};
PreviewImage.close = function() {
  if (previewInstance) {
    previewInstance = null;
  }
};
export default PreviewImage;
