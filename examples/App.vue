<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>欢迎使用Vue组件库项目</p>
    <h2>TreeSelectDemo demo</h2>
    <TreeSelectDemo />
    <h2>vTable demo</h2>
    <VTableDemo></VTableDemo>
    <h2>SearchForm demo</h2>
    <SearchFormDemo></SearchFormDemo>
    <dy-form-demo></dy-form-demo>
    <PublicFunPanelDemo></PublicFunPanelDemo>
    <h2>DetailList demo</h2>
    <DetailListDemo></DetailListDemo>
  </div>
</template>

<script>
import TreeSelectDemo from "./components/TreeSelectDemo";
import VTableDemo from "./components/VTableDemo";
import SearchFormDemo from "./components/SearchFormDemo";
import DyFormDemo from "./components/DyFormDemo";
import PublicFunPanelDemo from "./components/PublicFunPanelDemo";
import DetailListDemo from "./components/DetailListDemo";
export default {
  name: "App",
  components: {
    TreeSelectDemo,
    VTableDemo,
    SearchFormDemo,
    DyFormDemo,
    PublicFunPanelDemo,
    DetailListDemo,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
