<template>
  <DetailList
    title="组件测试"
    :col="2"
    :data="data"
    :rules="rules"
    labelWidth="60"
  ></DetailList>
</template>

<script>
export default {
  data() {
    return {
      data: {
        name: "wulin",
        sex: 0,
        country: "zh",
        file: {
          fileName: "身份证",
          fileUrl: "http://wwww.sssx.com/da/xxxxxx.jpb",
        },
        deepObj: {
          habby: "篮球",
          feature: {
            test: "ddd",
          },
        },
      },
      rules: [
        { label: "姓名", prop: "name" },
        {
          label: "性别",
          prop: (row) => {
            return row.sex == 0 ? "男" : "女";
          },
        },
        { label: "国籍", prop: "deepObj.feature.test" },
        {
          label: "身份证",
          prop: "file.fileName",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
