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
    <h2>Extend demo</h2>
    <div id="extend_div"></div>
  </div>
</template>

<script>
import TreeSelectDemo from "./components/TreeSelectDemo";
import VTableDemo from "./components/VTableDemo";
import SearchFormDemo from "./components/SearchFormDemo";

export default {
  name: "App",
  components: { TreeSelectDemo, VTableDemo, SearchFormDemo }
};
import Vue from "vue";
var Profile = Vue.extend({
  template: "<p>{{firstName {{lastName}}</p>",
  data: function() {
    return { lastName: "wulin", firstName: "deng" };
  }
});
new Profile().$mount(document.querySelector("#extend_div"));
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
