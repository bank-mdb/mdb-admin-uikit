import axios from "axios";
import Vue from "vue";
export function downloadPdf(fileInfo) {
  let data = fileInfo.fileUrl;
  let filename = fileInfo.fileName;
  let appendUrl = url => {
    const globalFilter = Vue.filter("fileUrl");
    if (globalFilter) {
      return globalFilter(url);
    }
    return url;
  };
  data = appendUrl(data);
  axios
    .get(data, {
      responseType: "arraybuffer"
    })
    .then(res => {
      if (res.status == 200) {
        let blob = new Blob([res.data], {
          //type类型后端返回来的数据中会有，根据自己实际进行修改
          type: "application/pdf;charset-UTF-8"
        });
        if (typeof window.navigator.msSaveBlob !== "undefined") {
          window.navigator.msSaveBlob(blob, filename);
        } else {
          var blobURL = window.URL.createObjectURL(blob);
          // 创建隐藏<a>标签进行下载
          var tempLink = document.createElement("a");
          tempLink.style.display = "none";
          tempLink.href = blobURL;
          tempLink.setAttribute("download", filename);
          if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
          }
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);
          window.URL.revokeObjectURL(blobURL);
        }
      }
    })
    .catch(err => {
      console.error("文件下载失败！", err);
    });
}
