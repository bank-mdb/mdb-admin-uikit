<template>
  <div class="footer">
    <ul class="list">
      <li>地址：澳門宋玉生廣場22號雙鑽大廈</li>
      <li>联系方式：(853)28337766</li>
      <li>
        Copyright©MACAO DEVELOPMENT BANK LIMITED ALL Rights Reserved
      </li>
      <li>澳门发展银行版权所有</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TheFooter"
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.footer {
  background: transparent;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2;
  width: 100%;
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .list {
    display: inline;
    li {
      display: inline;
      font-size: 12px;
      color: #707070;
      margin-right: 20px;
    }
  }
}
</style>
