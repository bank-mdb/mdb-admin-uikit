<template>
  <div class="dy-form-demo">
    <dy-form ref="dyForm" label-position="right" :model="formModel" :formItems="formItems" label-width="130px"></dy-form>
  </div>
</template>
<script>
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
        ]
      ]
    }
  }
}
</script>

<style>
.dy-form-demo {
  width: 300px;
}
</style>
