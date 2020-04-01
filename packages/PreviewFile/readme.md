<!--
 * @Author: wulin
 * @Date: 2019-10-22 15:17:38
 * @Description: file content
 -->

## 介绍

对于图片，pdf 文件的预览和 pdf 文件的下载。

## 基本使用

rules 属性涉及到的相关属性。
| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :------ | :----- |
|url|文件预览地址。必选|String|—|
|fileName|文件名名称，可选 |String|以时间戳为默认文件名|
|fileType|文件类型|String|image，pdf|

```vue
<script>
import { PreviewFile } from "mdb-admin-uikit";

PreviewFile(url);
or
PreviewFile({url,fileName,fileType});
```
