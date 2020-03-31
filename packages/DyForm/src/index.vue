<template>
  <div>
    <el-form
      ref="elForm"
      :model="model"
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
            v-model="model[formItem.prop]"
            :propAppend.sync="model[formItem.props.propAppend]"
            :propPrepend.sync="model[formItem.props.propPrepend]"
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
            v-model="model[formItem.prop]"
          ></dynamic-col>
        </div>
      </el-row>
    </el-form>
    <el-button type="primary" v-if="showSubmitButton" class="submit-button" @click="submitHandle" :loading="loading">{{submitButtonContent}}</el-button>
  </div>
</template>
<script>
import dynamicItem from "./dynamicItem";
import dynamicCol from "./dynamicCol";
import dynamicMultiItems from "./dynamicMultiItems";
import nonRenderFormItem from "./nonRenderFormItem";
import { socrllToErrorMessageItem } from "./utils/index.js";
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
    dynamicMultiItems
  },
  data(){
    return {
      nonRenderFormItemData: nonRenderFormItem,
      loading: false
    };
  },
  provide() {
    return {
      fatherForm: this
    };
  },
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    formItems: {
      type: Array,
      default: () => []
    },
    showSubmitButton: {
      type: Boolean,
      default: true
    },
    submitFunction: {
      type: Function,
      required: true
    },
    submitButtonContent: {
      type: String,
      default: "确认"
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
      this.$refs.elForm.validate(result => {
        if(result) {
          this.loading = true;
          this.submitFunction();
        } else {
          socrllToErrorMessageItem();
        }
      });
    }
  }
}
</script>
<style scoped>
.submit-button {
  width: 150px;
  margin-top: 50px;
}
</style>

