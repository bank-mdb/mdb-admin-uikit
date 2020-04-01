<template>
  <div class="preview-container" v-if="visible">
    <div class="pdf-box">
      <object
        v-if="isPdf"
        ref="pdfObj"
        class="app-container show-resources"
        type="application/pdf"
        internalinstanceid="291"
        :data="getUrl"
        title=""
      >
      </object>

      <div v-else class="img">
        <img :src="getUrl" />
      </div>
    </div>

    <div class="download-btn">
      <button
        type="button"
        class="el-button el-button--info el-button--medium"
        @click="close"
      >
        <span>关闭</span>
      </button>
      <button
        v-if="isPdf"
        class="el-button el-button--primary el-button--medium"
        type="button"
        @click="download"
      >
        下载
      </button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { downloadPdf } from "@/utils/download";
export default {
  name: "PreviewFile",
  data() {
    return {
      url: "",
      fileName: "",
      fileType: "",
      onClose: null,
      visible: false
    };
  },
  watch: {
    visible(isVisible) {
      if (isVisible) {
        this.browserWarnning();
      }
    }
  },
  methods: {
    close() {
      this.visible = false;
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
      this.$destroy(true);
      if (this.$el) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    exportFile(fileObj) {
      let url = fileObj.fileUrl;
      let fileName = fileObj.fileName;
      var tempLink = document.createElement("a");
      tempLink.style.display = "none";
      tempLink.href = url;
      //带有文件名
      if (fileName) {
        tempLink.setAttribute("download", fileName);
      }
      if (typeof tempLink.download === "undefined") {
        tempLink.setAttribute("target", "_blank");
      }
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    },
    download() {
      const url = this.getUrl;
      const fileName = this.fileName || new Date().getTime() + "";
      downloadPdf({ fileUrl: url, fileName: fileName });
    },
    isFirefox() {
      const userAgent = navigator.userAgent;
      return userAgent.indexOf("Firefox") > -1;
    },
    browserWarnning() {
      if (this.isPdf && this.isFirefox()) {
        this.$message.warning(
          "提示：PDF中包含部分信息在火狐浏览器中未能完整显示，建议下载该文件或更换浏览器预览。"
        );
      }
    }
  },
  computed: {
    isPdf() {
      const fileType = this.fileType.toLowerCase();
      return fileType === "pdf" || (this.url && this.url.search(".pdf") > 0);
    },
    isImage() {
      const isImage = /[png|jpg|jpeg|bmp]$/.test(this.url);
      return isImage;
    },
    getUrl() {
      const globalFilter = Vue.filter("fileUrl");
      if (globalFilter) {
        return globalFilter(this.url);
      }
      return this.url;
    }
  }
};
</script>
<style lang="scss" scoped>
.download-btn {
  // position: absolute;
  // bottom: 50px;
  // left: 50%;
  // margin-left: -50px;
  // z-index: 10000;
}
/*动画*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
  transform: translate3D(0, 0, 0);
}
.fade-enter,
.fade-leave-active {
  transform: translate3D(100%, 0, 0);
}
/* bigimg */
.preview-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 2000;
  overflow: hidden;
  text-align: center;
}
/*遮罩层样式*/
.preview-container .img-layer {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/*不限制图片大小，实现居中*/
.preview-container .img img {
  height: 800px;
  overflow: scroll;
  max-width: 100%;
  margin: auto;
  z-index: 2001;
  height: 80vh;
}
.preview-container {
  .show-resources {
    width: 70%;
    height: 100%;
    visibility: visible;
    // position: fixed;
    z-index: 10011;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s;
    animation-fill-mode: forwards;
    animation-direction: alternate;
  }
  object,
  embed {
    animation-duration: 0.001s;
    animation-name: playerInserted;
  }
}
.pdf-box {
  height: calc(100vh - 80px);
  overflow: hidden;
  margin: 20px;
}
</style>
