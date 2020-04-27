<template>
  <div class="header-user">
    <slot name="icon"></slot>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">{{ app.userName }}<i class="el-icon-arrow-down el-icon--right"></i></span>
      <el-dropdown-menu slot="dropdown"
        class="home-header-dropdown">
        <el-dropdown-item v-for="(item, index) in app.dropdownList"
          :key="index"
          :command="item.action">{{ item.title }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: "HomeHeaderUser",
  inject: ["app"],
  methods: {
    handleCommand(commandAction) {
      commandAction();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.header-user {
  height: 46px;
  line-height: 46px;
  display: flex;
  margin-right: 30px;
  margin-left: 20px;
  span {
    font-size: 14px;
    // color: #b3b3b3;
  }
  .message {
    margin-right: 30px;
    position: relative;
    cursor: pointer;
    i {
      font-size: 30px;
      color: #d8d8d8;
    }
    .num {
      position: absolute;
      color: #fff;
      background: #e54141;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      right: 0;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0px;
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.home-header-dropdown {
  li {
    width: 168px;
    padding-left: 50px !important;
    height: 50px;
    line-height: 50px !important;
    padding: 0;
  }
}
</style>
