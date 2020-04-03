<template>
  <div class="panel-search" v-outside="handleClose">
    <el-input
      ref="input"
      v-model="keyword"
      autocomplete="off"
      placeholder="请输入编号或名字查询......"
      suffix-icon="el-icon-search"
      @focus="handleOpen"
      @input="handleSearchChange"
    ></el-input>
    <el-collapse-transition>
      <div class="result" v-if="showResult" :style="{width:`${inputWidth}px`}">
        <el-scrollbar :native="false" :noresize="false" tag="div">
          <div class="panel-wrapper">
            <PanelItem
              title="为您找到相关结果："
              :isSearch="true"
              :content="result"
              :hideEmptyItem="false"
              v-on="$listeners"
              @handleShowMore="handleClose"
            ></PanelItem>
          </div>
        </el-scrollbar>
        <div v-if="result.length === 0" class="empty">
          <svg-icon icon-class="empty" class="empty-icon"></svg-icon>
          <p>暂无相关结果</p>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import PanelItem from "./PanelItem.vue";
import outside from "../directives/outside.js";
export default {
  name: "PanelSearch",
  components: { PanelItem },
  inject: ["publicFunPanel"],
  directives: { outside },
  data() {
    return {
      keyword: "",
      showResult: false,
      result: [],
      inputWidth:0
    };
  },
  computed: {
    authMenuList() {
      return this.publicFunPanel.authMenuList;
    }
  },
  methods: {
    handleClose() {
      this.showResult = false;
    },
    handleOpen() {
      this.showResult = true;
    },
    handleSearchChange() {
      const result = this.authMenuList.filter(
        item =>
          this.keyword &&
          (item.title.includes(this.keyword) ||
            item.id.toLowerCase().includes(this.keyword.toLowerCase()))
      );
      this.result = result;
    }
  },
  mounted(){
    this.inputWidth = this.$refs.input.$el.clientWidth;
  },
  watch: {
    authMenuList: {
      handler() {
        this.handleSearchChange();
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.panel-search {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  .result {
    position: absolute;
    z-index: 2;
    top: 40px;
    width: 100%;
    background: #fff;
    box-shadow: 0px 3px 13px 0px rgba(40, 72, 100, 0.22);
    border-radius: 5px;
    .empty {
      width: 100%;
      padding: 40px;
      text-align: center;
      color: #8492a6;
      .empty-icon {
        font-size: 80px;
      }
    }
    .panel-wrapper{
      max-height: 500px;
      padding:0 10px; 
    }
  }
}
</style>

<style lang="scss">
.public-fun-panel .el-scrollbar__wrap{
  overflow-x: hidden !important;
}
</style>
