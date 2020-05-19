# AdvancedDetail 动态配置详情的组件

动态配置详情的组件。

## API

| 参数  | 说明               | 类型   | 默认值 |
| ----- | ------------------ | ------ | ------ |
| data  | 数据对象           | Object | -      |
| rules | 每一项 item 的配置 | array  | -      |
| title | 分组标题           | String | -      |
| col   | 显示列数           | String | -      |

引用方式：

```javascript
import advancedDetail from "@/components/base/AdvancedDetail";

export default {
  components: {
    advancedDetail
  }
};
```

## 代码演示 [demo]

```vue
<advanced-detail
  title="组件测试"
  col="1"
  :data="data"
  :rules="rules"
></advanced-detail>
```

data 数据示例

```json
{
  "name": "wulin",
  "sex": 0,
  "country": "zh",
  "file": {
    "fileName": "身份证",
    "fileUrl": "http://wwww.sssx.com/da/xxxxxx.jpb"
  },
  "deepObj": {
    "habby": "篮球",
    "feature": {
      "test": "ddd"
    }
  }
}
```

ruls.js 文件配置

```js
[
  { label: "姓名", prop: "name" },
  {
    label: "性别",
    prop: row => {
      return row.sex == 0 ? "男" : "女";
    }
  },
  { label: "国籍", prop: "deepObj.feature.test" },
  {
    label: "身份证",
    prop: (row, h) => {
      return h(Thumbnail, {
        props: { name: row.file.fileName, url: row.fileUrl }
      });
    }
  }
];
```
