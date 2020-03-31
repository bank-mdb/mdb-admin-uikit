<template>
  <div class="dy-form-demo">
    <dy-form ref="dyForm" label-position="right" :model="formModel" :formItems="formItems" label-width="130px"></dy-form>
    <!-- <el-button type="primary" @click="submitHandle">提交</el-button> -->
  </div>
</template>
<script>
// import {socrllToErrorMessageItem} from "mdb-admin-uikit";

export default {
  data() {
    return {
      formModel: {
        name: "",
        sex: 2,
        birthday: ""
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
              inputClass: "input-normal-size"
            },
            rules: [
              {
                message: "请输入姓名",
                required: true,
                trigger: "blur"
              }
            ]
          },
          {
            type: "el-input",
            label: "你的姓名",
            prop: "name",
            span: 12,
            props: {
              placeholder: "请输入姓名",
              clearable: true,
              inputClass: "input-normal-size"
            }
          }
        ],
        [
          {
            type: "el-select",
            label: "性别",
            prop: "sex",
            props: {
              placeholder: "请选择性别",
              clearable: true,
              inputClass: "input-normal-size"
            },
            children: [
              {
                type: "el-option",
                props: {
                  label: "女",
                  value: 1
                }
              },
              {
                type: "el-option",
                props: {
                  label: "男",
                  value: 2
                }
              }
            ],
            rules: [
              {
                message: "请选择性别",
                required: true,
                trigger: "blur"
              }
            ]
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
              inputClass: "input-normal-size"
            }
          }
        ]
      ]
    }
  },
  methods: {
    async submitHandle(){
      try {
        this.$refs.dyForm.validate(res => {
          if(res) {
            console.log("成功");
          } else {
            this.socrllToErrorMessageItem();
          }
        })
        // await validateForms(this.$refs.dyForm)
        //console.log("成功");
      } catch(err) {
        console.log("失败", err)
      }
      
    }
  }
}
</script>

<style>
.dy-form-demo .input-normal-size {
  width: 300px;
}
</style>
