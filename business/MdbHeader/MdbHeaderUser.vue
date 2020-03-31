<template>
  <div class="header-user">
    <span class="message" v-show="hasPermission" @click="toMessage"
      ><i class="iconfont mdb-xiaoxi"></i
      ><span class="num" v-if="unreadMsgCount > 0">{{
        unreadMsgCount
      }}</span></span
    >
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link"
        >{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i
      ></span>

      <el-dropdown-menu slot="dropdown" class="home-header-dropdown">
        <el-dropdown-item
          v-for="(item, index) in dropdownList"
          :key="index"
          :command="item.action"
          >{{ item.title }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import routePath from "@/router/routePath";
import store from "@/store";
import LogoutDialog from "mdb-admin-uikit/business/LogoutDialog";
export default {
  name: "HomeHeaderUser",
  data() {
    return {
      dropdownList: [
        {
          title: "账号中心",
          action: () => {
            window.location.href =
              window.location.origin + routePath.sysAccMHome.path;
          }
        },
        {
          title: "退出登录",
          action: () => {
            LogoutDialog().show();
          }
        }
      ],
      hideUser: [routePath.forgetPwd.name]
    };
  },
  computed: {
    userName() {
      return store.getters.userInfo["userName"];
    },
    unreadMsgCount() {
      return store.getters.unreadMsgCount;
    },
    hasPermission() {
      let menus = store.getters.authMenuList || [];
      let hasMsg = menus.find(item => item.url === "msg_q");
      return hasMsg !== undefined;
    }
  },
  methods: {
    handleCommand(commandAction) {
      commandAction();
    },
    toMessage() {
      window.location.href = window.location.origin + "/msg-q/list";
    }
  },
  watch: {
    async $route() {
      if (this.hasPermission) {
        store.dispatch("GET_USER_MESSAGE");
      }
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
