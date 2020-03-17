<!--
 * @Author: wulin
 * @Date: 2019-10-22 15:13:52
 * @Description: file content
 -->

## 介绍

对于列表的使用的高级封装，高级列表-结合网络请求，分页，排序，过滤字段等多种功能结合。

## 基本使用

rules 属性涉及到的相关属性。
| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :------ | :----- |
|url|必选。接口请求地址。|String|—|
|columns|必选。表单列的字段，详情请看 vTable|Array|—|
|rules|可选。列表表头的查询条件,详情请看 searchForm|Array|—|
|query|可选。表单的附加的查询条件|Object|—|
|before-load|可选。加载前的回调|function(params,done) load(params) 用于开启加载|—|

::: tip
在编写列表类文件的时候，建议把 columns,rules 单独作为一个文件，便于维护。
:::

```vue
<template>
  <advanced-table
    :url="path"
    :rules="rules"
    :columns="colums"
    :before-load="bindBeforeLoad"
  />
</template>
<script>
import COLUMS from "./columns.js";
import RULES from "./rules.js";
import PATH from "@/api/path.js";
export default {
  components: { AdvancedTable },
  data() {
    return {
      rules: RULES,
      path: PATH.FINANCE_TRADE_IMPORT,
      colums: COLUMS
    };
  },
  method: {
    bindBeforeLoad(params, load) {
      console.log("beforeLoad: ", params, load);
      load(params);
    }
  }
};
</script>
```
