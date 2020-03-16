<!--
 * @Author: wulin
 * @Date: 2019-10-22 16:21:01
 * @Description: file content
 -->
<template>
  <div class="container">
    <SearchForm :rules="rules" @submit="onSubmit"></SearchForm>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rules: [
        {
          type: "date",
          field: "search_date",
          title: "时间"
        },
        {
          type: "input",
          field: "name",
          title: "文本"
        },
        {
          type: "select",
          field: "text",
          title: "下拉选择",
          options: {
            "": "全部",
            A: "A option",
            B: "B option"
          },
          value: ""
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      //...
    }
  }
};
</script>
