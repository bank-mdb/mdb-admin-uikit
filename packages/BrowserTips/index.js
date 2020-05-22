import { Message } from "element-ui"
const BrowserTips = () => {
  const userAgent = window.navigator.userAgent
  // eslint-disable-next-line no-useless-escape
  const isChrome = /Chrome\/([\d\.]+) Safari\/([\d\.]+)$/.test(userAgent)
  const firstEnter = window.performance.navigation.type == 0
  if (false === isChrome && firstEnter) {
    Message({
      message: "为了你有更好的使用体验，建议使用谷歌浏览器",
      duration: 3000,
      offset: 1000,
      customClass: "browser-tips"
    })
  }
}
BrowserTips.name = "BrowserTips"
BrowserTips.install = Vue => Vue.component(BrowserTips.name, BrowserTips)
export default BrowserTips
