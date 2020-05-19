<!--
 * @Author: wulin
 * @Date: 2019-10-21 15:08:42
 * @Description: file content
 -->

## 介绍

基于 element 的 table 组件升级改编。让使用更方便。

## 基础用法

<vtable-base></vtable-base>

```vue
<template>
  <VTable :columns="columns" :data="tableData"></VTable>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { label: '日期', prop: 'date' },
        { label: '姓名', prop: 'name' },
        { label: '地址', prop: 'address' },
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
      ],
    }
  },
}
</script>
```

## 自定义单元格样式

通过在 columns 中添加 customClass 属性，通过已定义的样式控制单元格样式。

<vtable-customclass></vtable-customclass>

```json
[
  { "label": "日期", "prop": "date" },
  { "label": "姓名", "prop": "name", "customClass": "text-link" },
  { "label": "地址", "prop": "address" }
]
```

## 自定义内容

通过 formatter 函数对当前数据进行简单的加工处理，这个方法接收 value,rowData 作为回调数据。

<vtable-formatter></vtable-formatter>

```js
{
    label: "日期",
    prop: "date",
    formatter: (value,row) => {
      return "<i class='el-icon-time'></i> "+value;
    }
}
```

## 自定义列模板

主要通过 vue 的渲染函数的方法来实现，可以定义更为复杂的内容。render 这个方法接收 createElement,rowData 作为回调数据。

<vtable-render></vtable-render>

```js
{
    label: "姓名",
    prop: "name",
    render: (h, data) => {
      return h("el-tag", data.row.name);
    }
}
```

## 设置操作列

是对于列表的常用操作的按钮组。通过设置 actions 数组类实现。

<vtable-actions></vtable-actions>

```js
{
    label: "操作",
    actions: [
        {
            label:"编辑",
            type: "button",//枚举有 text,button
            check: (index, rowData) => {
                //判断显示条件，返回 boolean.
                return true;
            },
            click: (index, rowData) => {
                //执行具体的逻辑业务
            }
        }

    ]
}
```

## 点击事件

通过监听 el-table 的列的点击事件实现。cell-click 当某个单元格被点击时会触发该事件。该事件接收参数 row, column, cell, event。

```vue
<template>
  <vTable :columns="colums" :rules="rules" @cell-click="rowclick"> </vTable>
</template>
<script>
method:{
    rowclick(row, column) {
        if (column.property == "iPWhitelist") {
            //todo...
        }
    }
}
</script>
```

## 展开行

涉及到的相关属性。
| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :------ | :----- |
|expand|是一个渲染函数方法，通过它来控制展开内容的定义，一般是抽象出自定义组件。|Function|—|
| row-key |当前行的 key，只写属性 |String,Number|—|
|expand-row-keys | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。|Array|—|
|expand-change|当用户对某一行展开或者关闭的时候会触发该事件|Function|—|

<vtable-expand-demo></vtable-expand-demo>

```vue
<template>
  <VTable
    :stripe="false"
    :border="false"
    :columns="columns"
    :data="tableData"
    :row-key="getRowKeys"
    :expand-row-keys="expands"
    :expand="expandRender"
  ></VTable>
</template>

<script>
import expandDetail from './expand-detail'
import 'element-ui/lib/theme-chalk/index.css'
import VTable from '@components/VTable/index.js'
export default {
  components: {
    expandDetail,
    VTable,
  },
  data() {
    return {
      getRowKeys(row) {
        return row['id']
      },
      expands: [],
      expandRender: {
        render: function(h, params) {
          return h(expandDetail, {
            props: { row: params.row },
          })
        },
      },
      columns: [
        { label: '商品ID', prop: 'id' },
        { label: '商品名称', prop: 'name' },
        { label: '描述', prop: 'desc' },
      ],
      tableData: [
        {
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
        },
        {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
        },
        {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
        },
        {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
        },
      ],
    }
  },
}
</script>
```

<style>
.el-table__body,
.el-table__footer,
.el-table__header {
  table-layout: fixed;
  border-collapse: collapse;
}
.el-table__header-wrapper {
  margin-bottom: -35px;
}</style>
