<!--
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-03-08 11:47:20
 * @Description: 退出登陆
 -->
<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="450px"
    class="editer-dialog"
    :before-close="handleClose"
  >
    确定要退出登录？
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        :disabled="isSubmit"
        :loading="isSubmit"
        type="primary"
        @click="bindSubmit"
        >确 认</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import store from "@/store";
import types from "@/store/mutation-types.js";
import router from "@/router";
import paths from "@/router/routePath";
export default {
  data() {
    return {
      dialogVisible: false,
      isSubmit: false,
      onClose: null
    };
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    hide() {
      this.dialogVisible = false;
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    handleClose(done) {
      this.hide();
      done();
    },
    bindSubmit() {
      store.dispatch(types.USER_LOGOUT).then(() => {
        router.replace(paths.login.path);
        this.hide();
      });
    }
  }
};
</script>

<style lang="scss">
.editer-dialog {
  .el-form {
    text-align: center;
    padding-left: 40px;
    padding-top: 12px;
  }
  .el-form-item {
    width: 400px;
    text-align: left;
    margin-bottom: 15px;
  }
  .dialog-footer {
    text-align: center;
  }
  .el-dialog__header {
    text-align: center;
  }
}
</style>
