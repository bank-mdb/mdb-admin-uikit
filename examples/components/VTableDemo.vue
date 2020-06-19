<!--
 * @Author: wulin
 * @Date: 2019-10-22 11:05:43
 * @Description: file content
 -->
<template>
  <VTable @select="bindSelect" @action="bindAction" :columns="columns" :data="tableData"></VTable>
</template>

<script>
export default {
  name: "vtable-demo",
  data() {
    return {
      columns: [
        {
          label: "日期",
          prop: "date",
          format: row => {
            return "<span class='tttt'>" + row.date + "</span>";
          }
        },
        { label: "姓名", prop: "name", tips: "hello" },
        { label: "地址", prop: "address" },
        {
          label: "地址",
          actions: [
            {
              label: "查看",
              prop: "view"
            },
            {
              label: "编辑",
              prop: "edit"
            }
          ]
        }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    bindSelect() {},
    bindAction(prop, row) {
      console.log("bindAction", prop, row);
    }
  }
};
</script>
