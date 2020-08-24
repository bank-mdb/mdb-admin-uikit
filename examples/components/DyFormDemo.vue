<template>
  <div class="dy-form-demo">
    <div class="title">dy-form demo</div>
    <dy-form
      ref="dyForm"
      label-position="right"
      :apis="apis"
      :formItems="formItems"
      label-width="130px"
      @submit-failed="submitFailed"
    ></dy-form>
  </div>
</template>
<script>
// import {socrllToErrorMessageItem} from "mdb-admin-uikit";

export default {
  data() {
    return {
      loading: false,
      apis: {
        url: "/helloworld/zhangn",
        method: "PUT"
      },
      formItems: [
        [
          {
            type: "el-input",
            label: "姓名",
            prop: "name",
            span: 12,
            props: {
              placeholder: "请输入姓名",
              clearable: true,
              inputClass: "input-normal-size",
            },
            rules: [
              {
                message: "请输入姓名",
                required: true,
                trigger: "blur",
              },
            ],
          },
          {
            type: "el-input",
            label: "你的姓名",
            prop: "name",
            span: 12,
            props: {
              placeholder: "请输入姓名",
              clearable: true,
              inputClass: "input-normal-size",
            },
          },
        ],
        [
          {
            type: "MdbColCaptcha",
            label: "",
            prop: "emailCaptcha",
            props: {
              sendTo: "name",
              sendType: "email",
              biz: "注册账号",
              inputClass: "input-normal-size",
            },
          },
        ],
        [
          {
            type: "el-select",
            label: "性别",
            prop: "sex",
            props: {
              placeholder: "请选择性别",
              clearable: true,
              inputClass: "input-normal-size",
            },
            children: [
              {
                type: "el-option",
                props: {
                  label: "女",
                  value: 1,
                },
              },
              {
                type: "el-option",
                props: {
                  label: "男",
                  value: 2,
                },
              },
            ],
            rules: [
              {
                message: "请选择性别",
                required: true,
                trigger: "blur",
              },
            ],
          },
        ],
        [
          {
            type: "el-date-picker",
            label: "出生日期",
            prop: "birthday",
            props: {
              placeholder: "请选择出生日期",
              clearable: true,
              type: "date",
              "value-format": "yyyy-MM-dd",
              inputClass: "input-normal-size",
            },
          },
        ],
      ],
    };
  },
  methods: {
    submitHandle() {
      try {
        console.log("model", this.formModel);
        this.$refs.dyForm.loading = false;
      } catch (err) {
        console.log("失败", err);
      }
    },
    submitFailed(err){
      console.log("提交失败", err)
    }
  },
};
</script>

<style>
.dy-form-demo .input-normal-size {
  /* width: 300px; */
}
.dy-form-demo .title {
  font-size: 30px;
  font-weight: 550;
  margin-bottom: 30px;
}
</style>
