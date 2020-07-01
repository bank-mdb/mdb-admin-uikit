## v1.0.97（2020-06-17）

### Features

- 打包优化。去掉箭头函数。

## v1.0.96（2020-06-17）

## v1.0.94（2020-06-30）

### Bug fixes

- dy-form 修复编辑情况部分值丢失的问题

## v1.0.93（2020-06-17）

### Features

- dy-form 增加 validate-failed 事件

### Bug fixes

- AdvancedTable 的当最后一页删除当时候，页数减一。
- VTable 的固定列设置优化

## v1.0.92（2020-06-19）

### Bug fixes

- AdvancedTable 的自定表头优化

## v1.0.90（2020-06-17）

### Features

- AdvancedTable page-sizes 的属性增加

## v1.0.87（2020-06-16）

### Bug fixes

- 面包屑导航文字的鼠标样式

## v1.0.87（2020-06-16）

### Bug fixes

- dy-form checkout 编辑异常情况

## v1.0.85（2020-06-16）

### Features

- dy-form 提交按钮不可见时仍可用 submitHandle 方法提交

## v1.0.84（2020-06-11）

### Features

- AdvancedTable 增加设置 pageSize 属性。默认 10。

## v1.0.83（2020-06-11）

### Bug fixes

- dy-form 编辑表单时不可编辑异常

## v1.0.82（2020-06-11）

### Bug fixes

- dy-form 绑定 dataGetter 时，取消 mounted 生命周期函数中的接口调用

## v1.0.81（2020-06-11）

###   Features

- dy-form 新增 dataGetter 对象属性，用于编辑表单情况，含两个属性，url：接口地址，arrange：formModel => {}支持自己重新组装 formModel 某些属性

## v1.0.80（2020-06-10）

###  Bug Fixes

- dy-form 避免直接修改 formModel

## v1.0.79（2020-06-10）

###  Bug Fixes

- advanceTable 通过 Vue 对象无法访问到\$http 对象。

## v1.0.78（2020-06-08）

###  Bug Fixes

- advanceTable 在通过挂载的方式加载无法访问到\$route 对象。

## v1.0.76（2020-06-08）

###  Bug Fixes

- advanceTable 在 query 参数更新后，组件内部的参数未发生变化。

## v1.0.75（2020-06-05）

###  Bug Fixes

- searchForm 修复,只有一个输入框（el-input）的情况下，回车会提交表单

## v1.0.72（2020-05-25）

###  Features

- dy-form 新增 phone-input 组件

## v1.0.71（2020-05-22）

###  Features

- dy-form 绑定 model 支持 Array, 支持自定义组件在使用 dy-form 组件的地方注册为局部组件

## v1.0.70（2020-05-22）

### Bug Fixes

- 修复 dy-form 设置 param 优先级问题

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
