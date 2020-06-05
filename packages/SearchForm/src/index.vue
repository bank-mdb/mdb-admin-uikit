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
            :filterable="item.filterable || false"
            :clearable="item.clearable || true"
            :remote="item.remote || false"
            :remote-method="item.filter"
            @keyup.enter.native="bindNull"
          >
            <el-option
              v-for="option in parseOption(item.options, item)"
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

          <!-- 单个日期 -->
          <el-date-picker
            v-else-if="item.type == 'singleDate'"
            v-model="ruleForm[item.field]"
            type="date"
            align="left"
            value-format="yyyy-MM-dd"
          ></el-date-picker>

          <!-- cascader -->
          <el-cascader
            v-else-if="item.type == 'cascader'"
            v-model="ruleForm[item.field]"
            :options="item.options"
            :placeholder="item.placeholder"
            @keyup.enter.native="bindNull"
          ></el-cascader>
          <!-- input range -->
          <el-row v-else-if="item.type == 'range'">
            <el-col :span="11">
              <el-input
                v-model.trim="ruleForm[item.field[0]]"
                :placeholder="rangePlaceHolder(item.placeholder, 0)"
                @keyup.enter.native="bindNull"
              >
                <template v-if="item.prepend" slot="prepend">{{
                  item.prepend
                }}</template>
              </el-input>
            </el-col>
            <el-col class="line" style="text-align: center;" :span="1"
              >-</el-col
            >
            <el-col :span="11">
              <el-input
                v-model.trim="ruleForm[item.field[1]]"
                :placeholder="rangePlaceHolder(item.placeholder, 1)"
                @keyup.enter.native="bindNull"
                ><template v-if="item.prepend" slot="prepend">{{
                  item.prepend
                }}</template>
              </el-input>
            </el-col>
          </el-row>
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
import Vue from 'vue'
export default {
  name: 'SearchForm',
  props: {
    rules: {
      type: Array,
    },
  },
  data() {
    return {
      ruleForm: {},
      selectOptions: [],
    }
  },
  mounted() {
    const queryParam = this.$route.query
    this.rules.forEach((item) => {
      let defaultValue = ''
      let field = item.field //Sting,Array,
      if (item.type === 'date') {
        if (typeof item.field === 'string') {
          //兼容旧版
          item.field = ['startDate', 'endDate']
        }
        if (Array.isArray(item.field)) {
          field = item.field.join(',')
        }
        if (item.defaultValue === 'today') {
          const date = new Date()
          const today = [
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
          ].join('-')
          defaultValue = [today, today]
        }
        Vue.set(this.ruleForm, field, defaultValue)
      } else if (
        item.type === 'range' &&
        Array.isArray(item.field) &&
        item.field.length == 2
      ) {
        defaultValue = Array.isArray(item.value) ? item.value : ['', '']
        let tempStartVal = queryParam[item.field[0]] || defaultValue[0]
        let tempEndVal = queryParam[item.field[1]] || defaultValue[0]
        Vue.set(this.ruleForm, item.field[0], tempStartVal)
        Vue.set(this.ruleForm, item.field[1], tempEndVal)
      } else {
        defaultValue = queryParam[item.field] || item['value'] || ''
        Vue.set(this.ruleForm, field, defaultValue)
      }
    })
  },
  methods: {
    onSubmit() {
      const queryParm = this.getData()
      this.$emit('submit', queryParm)
    },
    getData() {
      let queryParm = {}
      Object.keys(this.ruleForm).forEach((key) => {
        let value = this.ruleForm[key]
        if (Array.isArray(value)) {
          if (value.length === 2 && /00:00:00$/.test(value[1])) {
            let tempEndDate = value[1]
            tempEndDate = tempEndDate.replace('00:00:00', '23:59:59')
            value[1] = tempEndDate
          }
          let keys = key.split(',')
          keys.forEach((item, idx) => {
            if (idx < value.length && value[idx]) queryParm[item] = value[idx]
          })
        } else {
          if (value) queryParm[key] = value
        }
      })
      return queryParm
    },
    resetForm() {
      //fixed:对于 date，cascader 的value必须是array
      Object.keys(this.ruleForm).forEach((key) => {
        let value = this.ruleForm[key]
        if (Array.isArray(value)) {
          let isTypeDate = /00:00:00$/.test(value[0])
          if (isTypeDate) {
            this.ruleForm[key] = ''
          } else {
            let tempKeys = key.split(',')
            this.ruleForm[key] = new Array(tempKeys.length).fill('')
          }
        } else {
          this.ruleForm[key] = ''
        }
      })
      this.onSubmit()
    },
    parseOption(option) {
      if (Array.isArray(option)) return option
      const options = []
      for (let key in option) {
        options.push({
          value: key,
          label: option[key],
        })
      }
      return options
    },
    bindSelectChange() {
      const queryParm = this.getData()
      this.$emit('change', queryParm)
    },
    optionKey(key) {
      return this._uid + '- ' + key
    },
    remoteMethod(query) {
      console.log('remoteMethod: ', query, arguments)
      // if (typeof item.filter === "function") {
      //   item.options = item.filter(query);
      // }
    },
    rangePlaceHolder(placeholder, index) {
      if (Array.isArray(placeholder)) return placeholder[index]
      return placeholder
    },
    bindNull(){}
  },
}
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
