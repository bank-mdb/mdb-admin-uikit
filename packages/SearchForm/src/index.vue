<!--
 * @Author: wulin
 * @Date: 2019-05-28 20:28:49
 * @Description: 查询表单
 -->
<template>
  <div class="search-form">
    <el-form ref="searchForm" inline size="mini" :model="ruleForm">
      <template v-for="(item, index) in rules">
        <el-form-item :label="item.title" :key="index">
          <!-- input -->
          <el-input
            v-if="item.type == 'input'"
            v-model.trim="ruleForm[item.field]"
            :placeholder="item.placeholder"
            @keyup.enter.native="onSubmit"
          ></el-input>

          <!-- select -->
          <el-select
            v-else-if="item.type == 'select'"
            v-model="ruleForm[item.field]"
            :placeholder="item.placeholder"
            @change="onSubmit"
          >
            <el-option
              v-for="option in parseOption(item.options, item.options)"
              :key="option.key"
              :label="option.label"
              :value="option.value"
            />
          </el-select>

          <!-- date -->
          <el-date-picker
            v-else-if="item.type == 'date'"
            v-model="ruleForm[item.field]"
            type="daterange"
            style="width:300px;"
            align="left"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>

          <!-- cascader -->
          <el-cascader
            v-else-if="item.type == 'cascader'"
            v-model="ruleForm[item.field]"
            :options="item.options"
            :placeholder="item.placeholder"
          ></el-cascader>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "SearchForm",
  props: {
    rules: {
      type: Array
    }
  },
  data() {
    return {
      ruleForm: {},
      loading: false
    };
  },
  created() {
    this.rules.forEach(item => {
      let defaultValue = item["value"] || "";
      let field = item.field; //Sting,Array,
      if (item.type === "date") {
        if (typeof item.field === "string") {
          //兼容旧版
          item.field = ["startDate", "endDate"];
        }
        if (Array.isArray(item.field)) {
          field = item.field.join(",");
        }
        if (item.defaultValue === "today") {
          const date = new Date();
          const today = [
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          ].join("-");
          defaultValue = [today, today];
        }
      }
      Vue.set(this.ruleForm, field, defaultValue);
    });
  },
  methods: {
    onSubmit() {
      const queryParm = this.getData();
      this.$emit("submit", queryParm);
    },
    getData() {
      let queryParm = {};
      for (let key in this.ruleForm) {
        let value = this.ruleForm[key];
        if (value && value.length > 0) {
          if (Array.isArray(value)) {
            let keys = key.split(",");
            if (value.length === 2 && /00:00:00$/.test(value[1])) {
              let tempEndDate = value[1];
              tempEndDate = tempEndDate.replace("00:00:00", "23:59:59");
              value[1] = tempEndDate;
            }
            keys.forEach((item, idx) => {
              if (idx < value.length) queryParm[item] = value[idx];
            });
          } else {
            queryParm[key] = value;
          }
        }
      }
      return queryParm;
    },
    resetForm() {
      this.$refs.searchForm.resetFields();
      this.rules.map(item => {
        item["value"] = "";
        this.ruleForm[item["field"]] = "";
      });
      this.onSubmit();
    },
    parseOption(_obj, option) {
      const optionsObj = _obj || option;
      const options = [];
      for (let key in optionsObj) {
        options.push({
          value: key,
          label: _obj[key],
          key: this._uid + "-" + key
        });
      }
      return options;
    }
  }
};
</script>

<style lang="scss">
.search-form {
  width: fit-content;
  display: inline-block;
  background-color: white;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding-left: 20px;
  form {
    padding-top: 30px;
    margin-bottom: 10px;
  }
  .el-form-item__label {
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #606266;
  }
  .el-range-separator {
    width: 10% !important;
  }
  .el-date-range-picker {
    left: 120px;
  }
  .el-form-item--mini {
    margin-right: 20px;
  }
}
</style>
