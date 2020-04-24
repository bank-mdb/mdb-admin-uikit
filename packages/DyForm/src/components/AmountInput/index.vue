<template>
  <el-col :span="span" class="mdb-amount-input">
    <el-form-item
      :label="label"
      :prop="prop"
      :class="formItemClass"
      :rules="rules"
    >
      <el-input
        v-bind="$attrs"
        v-on="$listeners"
        clearable
        :placeholder="placeholderDefault"
        :class="inputClass"
      >
        <el-select
          v-model="ccy"
          :slot="selectPosition"
          style="width: 100px;"
          @change="amountCcyChangeHandle"
          :disabled="isSelectDisabled"
        >
          <el-option
            v-for="item in ccySource"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </el-select>
      </el-input>
    </el-form-item>
  </el-col>
</template>
<script>
const ccySource = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "CNY", label: "CNY" }
];

export default {
  name: "amount-input",
  data() {
    return {};
  },
  props: {
    span: {
      type: Number,
      default: 24
    },
    label: {
      type: String,
      default: "金额"
    },
    placeholder: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      default: ""
    },
    propAppend: {
      type: String,
      default: "USD"
    },
    inputClass: {
      type: String,
      default: ""
    },
    formItemClass: {
      type: String,
      default: ""
    },
    rules: Array,
    selectPosition: {
      type: String,
      default: "prepend"
    },
    ccySourceData: Array,
    isSelectDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    placeholderDefault: function() {
      return this.placeholder || `请输入${this.label}`;
    },
    ccySource: function() {
      return this.ccySourceData || ccySource;
    },
    ccy: {
      get: function() {
        return this.propAppend;
      },
      set: function() {}
    }
  },
  methods: {
    amountCcyChangeHandle(val) {
      this.$emit("update:propAppend", val);
    }
  }
};
</script>
<style lang="scss" scoped>
.mdb-amount-input {
  ::v-deep .el-input .el-input__inner {
    color: #272727;
  }
  ::v-deep .el-input .el-icon-arrow-up {
    color: #272727;
  }
}
</style>
