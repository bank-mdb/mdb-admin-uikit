<template>
  <mdb-header
    @logoClick="logoClick"
    :dropdownList="dropdownList"
    :userName="userName"
  >
    <template v-slot:icon>
      <span class="message" v-show="hasPermission" @click="toMessage"
        ><i class="iconfont mdb-xiaoxi"></i
        ><span class="num" v-if="unreadMsgCount > 0">{{
          unreadMsgCount
        }}</span></span
      >
    </template>
  </mdb-header>
</template>
<script>
export default {
  name: 'mdb-header-demo',
  data() {
    return {
      dropdownList: [
        {
          title: '账号中心',
          action: () => {
            alert('账号中心')
          },
        },
        {
          title: '退出登录',
          action: () => {
            alert('退出登录')
          },
        },
      ],
      userName: '刘德华',
      unreadMsgCount: 1,
      hasPermission: true,
    }
  },
  methods: {
    logoClick() {
      alert('点击logo')
    },
    toMessage() {
      alert('点击')
    },
  },
}
</script>
