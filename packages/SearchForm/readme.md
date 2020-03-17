<!--
 * @Author: wulin
 * @Date: 2019-10-22 15:17:38
 * @Description: file content
 -->

## 介绍

对于列表的列表常用查询的封装。

<searchForm-demo></searchForm-demo>

## 基本使用

rules 属性涉及到的相关属性。
| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :------ | :----- |
|type|表单类型。必选|枚举。有 input,select,date,cascader|—|
|field|表单字段。对于 date,默认是 startDate,endDate,也可以设置数组改变它["start_date","end_date"] |String,Array|—|
|title|显示的标题|String|—|
|value|表单的查询默认值|String|—|
|placeholder|表单 input 的 plaseHolder|String|—|

```vue
<template>
  <SearchForm :rules="rules" @submit="onSubmit"></SearchForm>
</template>
<script>
export default {
  data() {
    return {
      rules: [
        {
          type: "date",
          field: "search_date", //or ["startDate","endDate"]
          title: "时间"
        },
        {
          type: "input",
          field: "text",
          title: "文本"
        },
        {
          type: "select",
          field: "text",
          title: "文本",
          options: {
            "": "全部",
            A: "A option",
            B: "B option"
          },
          value: ""
        },
        {
          type: "cascader",
          field: ["one", "two", "three"],
          title: "级联选择",
          options: [
            {
              value: "zhinan",
              label: "指南",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  method: {
    onSubmit(formData) {
      //...
    }
  }
};
</script>
```
