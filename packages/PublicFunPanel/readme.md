## 介绍

项目功能列表。

## 基本使用

相关属性。
| 属性 | 说明 | 类型 | 默认值 |
| :-- | :-- | :------ | :----- |
|functions|必选。当前用户能访问的功能。|Array|[]|
|productPrefixFile|必选。产品配置列表。|Array|[]|
|publicPath|必选。项目vue.config.js文件中配置的publicPath。|String|/|
|adjustHeight|可选。用于浏览器尺寸变化时调整功能列表高度。|Number|140|

Events
| 事件名称 | 说明 | 回调参数 |
| :-- | :-- | :------ | 
|collectionChange|点击收藏/取消某个功能时触发的事件,在这个事件的函数中需要修改该功能的收藏状态，并且更新functions数据|1、resCode(功能id)2、isCancel(操作类型，true时为取消收藏，false为添加收藏)|

```vue
<template>
  <div class="PublicFunPanel">
    <div class="title">PublicFunPanel demo</div>
    <div class="main">
      <PublicFunPanel
        :functions="functions"
        :productPrefixFile="productPrefixFile"
        publicPath="/"
        :adjustHeight="10"
        @collectionChange="collectionChange"
      ></PublicFunPanel>
    </div>
  </div>
</template>
<script>
import path from "@/api/path";
export default {
  data() {
    return {
      functions: [
        {
          status: "0",
          id: "CBMC001",
          icon: null,
          spread: false,
          title: "操作记录跟踪",
          url: "operation_rec_q",
          resParent: null,
          resVo: [],
          children: [],
          path: "/operation-rec-q"
        },
        {
          status: "0",
          id: "CBMC002",
          icon: null,
          spread: false,
          title: "业务状态跟踪",
          url: "business_sta_q",
          resParent: null,
          resVo: [],
          children: [],
          path: "/business-sta-q"
        },
        {
          status: "2",
          id: "CPF000",
          icon: "true",
          spread: false,
          title: "内部调用接口",
          url: "inner_call",
          resParent: null,
          resVo: [],
          children: [],
          path: "/inner-call"
        },
        {
          status: "2",
          id: "CPF001",
          icon: "true",
          spread: false,
          title: "公共功能",
          url: "public_fun",
          resParent: null,
          resVo: [],
          children: [],
          path: "/public-fun"
        }
      ],
      productPrefixFile: [
        {
          title: "平台基础功能",
          prefix: "CPF",
          publicPath: "/"
        },
        {
          title: "业务监控中心",
          prefix: "CBMC",
          publicPath: "/bmc"
        }
      ]
    };
  },
  created() {
    this.getProductPrefixFile();
  },
  methods: {
    async getProductPrefixFile() {
      const { data = [] } = await this.$http.get(path.PRODUCT_PREFIX_FILE);
      this.productPrefixFile = data;
    },
    async collectionChange(resCode, isCancel) {
      if (isCancel) {
        // 取消收藏
        await this.$http.delete(
          path.CANCEL_COLLECTION.format({
            resCode
          })
        );
      } else {
        // 添加收藏
        await this.$http.post(path.ADD_COLLECTION, {
          resCode
        });
      }
      // 修改functions数据
      const { data } = await this.$store.dispatch(
        MTYPES.PERMISSION_MENU_TAB_BTN
      );
      this.functions = data;
    }
  }
};
</script>


```
