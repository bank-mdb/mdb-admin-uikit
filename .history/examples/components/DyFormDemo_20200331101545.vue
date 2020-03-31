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
