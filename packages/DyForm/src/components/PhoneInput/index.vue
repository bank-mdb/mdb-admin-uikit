<template>
  <el-col :span="span">
    <el-form-item
      :label="label"
      :rules="rules"
      :prop="prop"
      :class="formItemClass"
    >
      <el-input
        v-bind="$attrs"
        v-on="$listeners"
        clearable
        :placeholder="placeholderDefault"
        :class="inputClass"
        :readonly="readonly"
        :disabled="disabled"
      >
        <el-select
          v-model="phoneCode"
          slot="prepend"
          style="width: 100px;"
          @change="phoneCodeChangeHandle"
          :disabled="(!containMacao && !containHk) || disabled"
        >
          <el-option label="+86" value="86"></el-option>
          <el-option label="+853" value="853" v-if="containMacao"></el-option>
          <el-option label="+852" value="852" v-if="containHk"></el-option>
        </el-select>
      </el-input>
    </el-form-item>
  </el-col>
</template>
<script>
import utils from "../../utils/formUtil.js";

export default {
  name: "phone-input",
  data() {
    let validatePhone = utils.validatePhone;
    if (this.propPrepend.includes("852")) {
      validatePhone = utils.validateHkPhone;
    } else if (this.propPrepend.includes("853")) {
      validatePhone = utils.validateMacaoPhone;
    }
    return {
      phoneCode: this.propPrepend,
      rules: this.required
        ? [utils.required(`请输入${this.label}`), validatePhone]
        : [validatePhone]
    };
  },
  props: {
    span: {
      type: Number,
      default: 24
    },
    label: {
      type: String,
      default: "联系电话"
    },
    placeholder: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      default: ""
    },
    inputClass: {
      type: String,
      default: ""
    },
    formItemClass: {
      type: String,
      default: ""
    },
    propPrepend: {
      type: String,
      default: "86"
    },
    containMacao: {
      type: Boolean,
      default: false
    },
    containHk: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    placeholderDefault: function() {
      return this.placeholder || `请输入${this.label}`;
    }
  },
  watch: {
    propPrepend: function(val) {
      this.phoneCode = val;
      this.phoneCodeChangeHandle(val);
    }
  },
  mounted() {
    //FIXED:propPrepend 属性设置问题：‘+’
    let phoneCode = this.propPrepend && this.propPrepend.replace("+", "");
    this.phoneCode =
      ["86", "853", "852"].indexOf(phoneCode) !== -1 ? phoneCode : "86";
  },
  methods: {
    phoneCodeChangeHandle(val) {
      this.$emit("update:propPrepend", val);
      this.$emit("updatePropPrepend", val);
      if (!val) return;
      this.rules.pop();
      switch (val.toString()) {
        case "86":
          this.rules.push(utils.validatePhone);
          break;
        case "853":
          this.rules.push(utils.validateMacaoPhone);
          break;
        case "852":
          this.rules.push(utils.validateHkPhone);
          break;
      }
    }
  }
};
</script>
