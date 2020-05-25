<template>
  <div class="dy-form-panel">
    <el-form
      ref="elForm"
      :model="formModel"
      v-bind="$attrs"
      v-on="$listeners"
      class="dy-form"
    >
      <el-row
        v-for="(row, index) in formItems"
        :key="index"
        v-bind:class="
          row.length > 0 && row[0].rowClass
            ? row[0].rowClass
            : 'dy-form-row-' + (index + 1)
        "
      >
        <div v-for="(formItem, idx) in row" :key="idx">
          <dynamic-item
            v-if="nonRenderFormItemData.includes(formItem.type)"
            :options="formItem"
            v-bind="$attrs"
            v-on="$listeners"
            v-model="formModel[formItem.prop]"
            :propAppend.sync="formModel[formItem.props.propAppend]"
            :propPrepend.sync="formModel[formItem.props.propPrepend]"
          ></dynamic-item>
          <dynamic-multi-items
            v-else-if="
              formItem.type === 'el-col' &&
                formItem.children &&
                formItem.children.length > 0
            "
            :options="formItem"
          ></dynamic-multi-items>
          <dynamic-col
            v-else
            :options="formItem"
            v-bind="$attrs"
            v-on="$listeners"
          ></dynamic-col>
        </div>
      </el-row>
    </el-form>
    <dy-button ref="dyBtn" :model="formModel" type="primary" :loading="loading" :apis="apis" v-if="showSubmitButton" class="submit-button" @click="submitHandle">{{submitButtonContent}}</dy-button>
  </div>
</template>
<script>
import dynamicItem from "./dynamicItem";
import dynamicCol from "./dynamicCol";
import dynamicMultiItems from "./dynamicMultiItems";
import nonRenderFormItem from "./nonRenderFormItem";
import { socrllToErrorMessageItem } from "./utils/index.js";
import dyButton from "./DynamicButton/index.vue"
import { createFormModelByFormItems } from "./utils/index.js"

/*
更新说明： 
  20200331：
    1，包装提交按钮，提交按钮提供三个对外属性 showSubmitButton(默认为true) , submitFunction,  submitButtonContent
    2, 组件使用者需在 submitFunction 方法最后调用 this.$refs.dyForm.loading 设置 loading值为false
*/
export default {
  name: "dy-form",
  components: {
    dynamicItem,
    dynamicCol,
    dynamicMultiItems,
    dyButton
  },
  data(){
    return {
      nonRenderFormItemData: nonRenderFormItem,
      loading: false,
      formModel: this.model || {}
    };
  },
  provide() {
    return {
      fatherForm: this
    };
  },
  props: {
    model: Object,
    formItems: {
      type: Array,
      required: true
    },
    showSubmitButton: {
      type: Boolean,
      default: true
    },
    submitFunction: Function,
    submitButtonContent: {
      type: String,
      default: "确认"
    },
    apis: [Object, Array],
    // 提交之前的回调，不提交返回false
    beforeSubmit: Function
  },
  watch: {
    model: function(val) {
      let ml = {};
      createFormModelByFormItems(this.formItems, ml)
      this.formModel = val;
      Object.keys(ml).forEach(key => {
        if(!(key in this.formModel)) {
          this.$set(this.formModel, key, "")
        }
      })
    },
    formItems: function(val) {
      let ml = {};
      createFormModelByFormItems(val, ml)
      Object.keys(ml).forEach(key => {
        if(!(key in this.formModel)) {
          this.$set(this.formModel, key, "")
        }
      })
    }
  },
  beforeCreate(){
    // 拿到在父组件注册过的组件，这里不清楚上面还嵌套了多少层，目前只取上一层的局部注册组件
    Object.assign(this.$options.components, this.$parent.$options.components)
  },
  created(){
    let ml = {};
    createFormModelByFormItems(this.formItems, ml);
    if(Object.keys(this.formModel).length === 0) {
      this.formModel = ml;
    } else {
      // 如果model只传了部分属性，将其他属性补全
      Object.keys(ml).forEach(key => {
        if(!(key in this.formModel)) {
          this.$set(this.formModel, key, "");
        }
      })
    }
  },
  methods: {
    resetFields() {
      this.$refs.elForm.resetFields();
    },
    validate(callback) {
      this.$refs.elForm.validate(result => {
        callback(result);
      });
    },
    validateField(prop, callback) {
      this.$refs.elForm.validateField(prop, callback);
    },
    clearValidate() {
      this.$refs.elForm.clearValidate();
    },
    submitHandle(){
      this.$refs.elForm.validate(async result => {
        if(result) {
          try {
            if(typeof this.submitFunction === "function") {
              this.loading = true;
              this.submitFunction();
            } else if(this.apis) {
              if(typeof this.beforeSubmit === "function") {
                if(!this.beforeSubmit()) {
                  // 不允许提交，直接返回
                  return;
                }
              }
              let res = await this.$refs.dyBtn.submit();
              this.$emit("submit-success", res);
            } else {
              throw new Error("请设置提交方式 submitFunction 或 apis")
            }  
          } catch(err) {
            console.log(err);
            this.$emit("submit-failed", err);
          }
        } else {
          socrllToErrorMessageItem();
        }
      });
    }
  }
}
</script>
<style scoped>
.dy-form-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
}
.dy-form {
  width: 100%;
}
.submit-button {
  width: 150px;
  margin-top: 50px;
}
</style>

