## v1.0.72（2020-05-25）

###  Features

- dy-form 新增phone-input组件

## v1.0.71（2020-05-22）

###  Features

- dy-form 绑定model支持 Array, 支持自定义组件在使用dy-form组件的地方注册为局部组件

## v1.0.70（2020-05-22）

### Bug Fixes

- 修复dy-form 设置param优先级问题

## v1.0.67（2020-05-22）

### Bug Fixes

- 修复列表的分页导航分页数字显示错误的问题。

## v1.0.66（2020-05-21）

### Features

- dy-form  组件   提交之前增加 beforeSubmit 回调，返回 false 或 true，true 继续提交

## v1.0.65（2020-05-20）

### Features

- dy-form  组件   支持动态添加表单

## v1.0.64（2020-05-20）

### Features

- dy-form  组件   调整 apis.param 优先级比表单 model 高

## v1.0.63（2020-05-19）

### Features

- dy-form  组件   合并 apis.param 参数和表单 model 对象为提交接口的最终值

## v1.0.62（2020-05-19）

### Features

- dy-form 组件优化

## v1.0.61（2020-05-18）

### Bug Fixes

- 面包屑组件跳转到不同项目的路径错误问题，

## v1.0.60（2020-05-09）

### Bug Fixes

- 移除列表的右侧固定下划线

## v1.0.59（2020-05-09）

### Features

- 优化 Breadcrumb 组件。

## v1.0.58（2020-05-08）

### Features

- 增加 Breadcrumb 组件。

## v1.0.54（2020-04-27）

### Features

- 增加 SearchForm 的 range 范围类型。

## v1.0.51（2020-04-27）

### Features

- 增加 AdvancedTable 的 load-before,load-success,load-error 增加三个事件。

## v1.0.48（2020-04-21）

### Features

- 增加 SearchForm 的下拉刷选搜索功能。增加 filter，remote 属性，filter 的方法。

## 2020-04-03

### Features

- 增加 dy-form 中的 MdbColCaptcha 组件

## 2020-04-03

### Features

- 新增功能组件。PublicFunPanel

## 1.0.31 (2020-03-27)

### Features

- 新增文件预览组件。PreviewFile

## 1.0.23 (2020-03-25)

### Bug Fixes

- SearchForm 重置问题，对于 date 的 重置后变成了 1970，解决方案是 value 改为字符串

## 1.0.22 （2020-03-24）

### Bug Fixes

- SearchForm 重置失败对于 date，cascader 的 value 必须是 array

## 1.0.19 (2020-03-20)

### Features

- VTable 增加表头提示，在 columns 中增加 tips 属性。
- AdvanceTable 增加属性，beforeLoad 方法，可以在列表请求数据前做处理。
