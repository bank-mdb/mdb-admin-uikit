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
          status: "0",
          id: "CBMC003",
          icon: "true",
          spread: false,
          title: "异常记录跟踪",
          url: "abnormal_rec_q",
          resParent: null,
          resVo: [],
          children: [],
          path: "/abnormal-rec-q"
        },
        {
          status: "0",
          id: "CBMC004",
          icon: "true",
          spread: false,
          title: "预警记录跟踪",
          url: "warning_rec_q",
          resParent: null,
          resVo: [],
          children: [],
          path: "/warning-rec-q"
        },
        {
          status: "0",
          id: "CBMC005",
          icon: null,
          spread: false,
          title: "交易码管理",
          url: "trans_code_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/trans-code-m"
        },
        {
          status: "0",
          id: "CBMC006",
          icon: null,
          spread: false,
          title: "预警规则管理",
          url: "warning_rule_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/warning-rule-m"
        },
        {
          status: "2",
          id: "CBMC007",
          icon: null,
          spread: false,
          title: "系统参数管理",
          url: "sys_param_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/sys-param-m"
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
        },
        {
          status: "2",
          id: "CPF002",
          icon: "true",
          spread: false,
          title: "账号中心",
          url: "sys_acc_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/sys-acc-m"
        },
        {
          status: "2",
          id: "CPF003",
          icon: null,
          spread: false,
          title: "消息",
          url: "msg_q",
          resParent: null,
          resVo: [],
          children: [],
          path: "/msg-q"
        },
        {
          status: "0",
          id: "CPF004",
          icon: "true",
          spread: false,
          title: "消息管理",
          url: "msg_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/msg-m"
        },
        {
          status: "0",
          id: "CPF005",
          icon: "true",
          spread: false,
          title: "用户账号管理",
          url: "cli_sys_acc_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/cli-sys-acc-m"
        },
        {
          status: "0",
          id: "CPF006",
          icon: null,
          spread: false,
          title: "产品服务开通管理",
          url: "product_ser_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/product-ser-m"
        },
        {
          status: "0",
          id: "CPF007",
          icon: null,
          spread: false,
          title: "客户查询",
          url: "customer_q",
          resParent: null,
          resVo: [],
          children: [],
          path: "/customer-q"
        },
        {
          status: "0",
          id: "CPF008",
          icon: null,
          spread: false,
          title: "客户管理",
          url: "customer_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/customer-m"
        },
        {
          status: "0",
          id: "CPF009",
          icon: null,
          spread: false,
          title: "工单管理（NOR）",
          url: "job_normal_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/job-normal-m"
        },
        {
          status: "0",
          id: "CPF010",
          icon: null,
          spread: false,
          title: "工单管理（SEN）",
          url: "job_senior_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/job-senior-m"
        },
        {
          status: "0",
          id: "CPF011",
          icon: null,
          spread: false,
          title: "工单管理（SUP）",
          url: "job_super_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/job-super-m"
        },
        {
          status: "0",
          id: "CQP001",
          icon: null,
          spread: false,
          title: "签约管理",
          url: "sign_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/sign-m"
        },
        {
          status: "0",
          id: "CQP002",
          icon: null,
          spread: false,
          title: "交易查询",
          url: "trans_q",
          resParent: null,
          resVo: [],
          children: [],
          path: "/trans-q"
        },
        {
          status: "0",
          id: "CQP003",
          icon: null,
          spread: false,
          title: "对账管理",
          url: "acc_check_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/acc-check-m"
        },
        {
          status: "0",
          id: "CQP004",
          icon: null,
          spread: false,
          title: "结算查询",
          url: "acc_setl_q",
          resParent: null,
          resVo: [],
          children: [],
          path: "/acc-setl-q"
        },
        {
          status: "0",
          id: "CRCC001",
          icon: null,
          spread: false,
          title: "数据源管理",
          url: "data_source_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/data-source-m"
        },
        {
          status: "0",
          id: "CRCC002",
          icon: null,
          spread: false,
          title: "规则管理",
          url: "rule_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/rule-m"
        },
        {
          status: "0",
          id: "CRCC003",
          icon: null,
          spread: false,
          title: "模型管理",
          url: "model_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/model-m"
        },
        {
          status: "0",
          id: "CTF001",
          icon: null,
          spread: false,
          title: "商户查询",
          url: "merchant_q",
          resParent: null,
          resVo: [],
          children: [],
          path: "/merchant-q"
        },
        {
          status: "0",
          id: "CTF002",
          icon: null,
          spread: false,
          title: "商户管理",
          url: "merchant_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/merchant-m"
        },
        {
          status: "0",
          id: "CTF003",
          icon: null,
          spread: false,
          title: "额度查询",
          url: "limit_q",
          resParent: null,
          resVo: [],
          children: [],
          path: "/limit-q"
        },
        {
          status: "0",
          id: "CTF004",
          icon: null,
          spread: false,
          title: "额度管理",
          url: "limit_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/limit-m"
        },
        {
          status: "0",
          id: "CTF005",
          icon: null,
          spread: false,
          title: "业务信息查询",
          url: "business_info_q",
          resParent: null,
          resVo: [],
          children: [],
          path: "/business-info-q"
        },
        {
          status: "0",
          id: "CTF006",
          icon: null,
          spread: false,
          title: "业务信息管理",
          url: "business_info_m",
          resParent: null,
          resVo: [],
          children: [],
          path: "/business-info-m"
        },
        {
          status: "0",
          id: "CTF007",
          icon: null,
          spread: false,
          title: "融资信息查询",
          url: "trade_finance_q",
          resParent: null,
          resVo: [],
          children: [],
          path: "/trade-finance-q"
        },
        {
          status: "0",
          id: "CTF008",
          icon: "true",
          spread: false,
          title: "产品配置",
          url: "product_set",
          resParent: null,
          resVo: [],
          children: [],
          path: "/product-set"
        },
        {
          status: "2",
          id: "CTF009",
          icon: null,
          spread: false,
          title: "汇出款查询",
          url: "outward_rem_q",
          resParent: null,
          resVo: [],
          children: [],
          path: "/outward-rem-q"
        }
      ],
      productPrefixFile: [
        { title: "平台基础功能", prefix: "CPF", publicPath: "/" },
        { title: "贸易融资功能", prefix: "CTF", publicPath: "/tf" },
        { title: "快捷支付", prefix: "CQP", publicPath: "/ep" },
        { title: "风控中心", prefix: "CRCC", publicPath: "/rcc" },
        { title: "业务监控中心", prefix: "CBMC", publicPath: "/bmc" }
      ]
    };
  },
  methods: {
    async collectionChange(resCode, isCancel) {
      console.log("resCode, isCancel", resCode, isCancel);
      if (isCancel) {
        // await this.$http.delete(
        //   path.CANCEL_COLLECTION.format({
        //     resCode
        //   })
        // );
        // 模拟取消收藏
        this.functions = this.functions.map(item => {
          if (item.id === resCode) {
            return {
              ...item,
              icon: null
            };
          } else {
            return item;
          }
        });
      } else {
        // await this.$http.post(path.ADD_COLLECTION, {
        //   resCode
        // });
        // 模拟添加收藏
        this.functions = this.functions.map(item => {
          if (item.id === resCode) {
            return {
              ...item,
              icon: "true"
            };
          } else {
            return item;
          }
        });
      }
      // 实际使用时，需请求接口修改functions数据
      // await this.$store.dispatch(MTYPES.PERMISSION_MENU_TAB_BTN);
    }
  }
};
</script>

<style>
.PublicFunPanel {
  margin-top: 50px;
}
.title {
  font-size: 30px;
  font-weight: 550;
  margin-bottom: 30px;
}
.main {
  width: 600px;
  margin: 0 auto;
}
</style>
