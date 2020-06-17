<template>
  <div class="advanced-table">
    <div class="table-main-warper">
      <slot name="summer"></slot>
      <div class="table-header">
        <SearchForm
          ref="searchForm"
          class="table-search"
          v-if="rules"
          :rules="rules"
          @submit="onSubmit"
        ></SearchForm>
        <div class="table-actions">
          <slot name="actions"></slot>
        </div>
      </div>
      <v-table
        ref="mTable"
        :columns="columns"
        stripe
        v-loading="mLoading"
        :data="mDataSource"
        v-bind="$attrs"
        v-on="$listeners"
        :expand="expand"
        @cell-dblclick="celldbclick"
      ></v-table>
    </div>
    <div class="v-pagination">
      <el-pagination
        class="mdb-pagination"
        ref="vPagination"
        :background="mPagination.background"
        :current-page.sync="mPager.pageNo"
        :page-size.sync="mPager.pageSize"
        :layout="mPagination.layout"
        :total="mTotal"
        :hide-on-single-page="mPagination.hideOnSiglePage"
        @current-change="onPageIndexChange"
        @size-change="onPageSizeChange"
        :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import VTable from '../../VTable/src/index.vue'
import SearchForm from '../../SearchForm/src/index.vue'
export default {
  name: 'AdvancedTable',
  inheritAttrs: false,
  components: {
    VTable,
    SearchForm,
  },
  props: {
    defaultSort: {
      type: Object,
      default: () => {},
    },
    query: {
      type: Object,
      default: () => {},
    },
    columns: {
      type: Array,
      default: () => [],
    },
    rules: {
      type: Array,
      required: false,
    },
    url: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      default: 'columns',
    },
    expand: {
      type: Object,
      required: false,
    },
    beforeLoad: Function,
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      mLoading: false,
      mDataSource: [],
      mTotal: 0,
      mPager: {
        pageNo: 1,
        pageSize: this.pageSize,
      },
      mPagination: {
        background: true,
        hideOnSiglePage: false,
        layout: 'total,sizes, prev, pager, next',
      },
      queryParam: {},
      isDevelop: false,
    }
  },
  watch: {
    query() {
      Object.assign(this.queryParam, this.query)
    },
  },
  computed: {
    tableColum() {
      return this.columns
    },
  },
  created() {
    if (this.$refs.searchForm) {
      this.queryParam = this.$refs.searchForm.getData()
    }
    this.setQueryParam()
    this.onBeforeLoad()
  },
  methods: {
    setQueryParam() {
      if (!this.rules || (this.query && this.query['tab_index'])) return
      const query = (this.$route && this.$route.query) || {}
      const pageNo = parseInt(query.pageNo) || 1
      const pageSize = parseInt(query.pageSize) || this.pageSize
      this.mPager = { pageNo: pageNo, pageSize: pageSize }
      delete query['pageNo']
      delete query['pageSize']
      this.queryParam = Object.assign({}, this.queryParam, query)
      Object.keys(this.queryParam).forEach((key) => {
        this.rules.forEach((item) => {
          if (item.field === key && this.queryParam[key]) {
            item['value'] = this.queryParam[key]
          }
        })
      })
      //针对日期类型
      this.rules.forEach((item) => {
        if (item.type == 'date') {
          let tempField = item.field //array
          if (typeof item.field === 'string') {
            //兼容旧版
            tempField = ['startDate', 'endDate']
          }
          if (this.queryParam[tempField[0]] && this.queryParam[tempField[1]]) {
            item['value'] = [
              this.queryParam[tempField[0]],
              this.queryParam[tempField[1]],
            ]
          }
        } else if (item.type == 'cascader') {
          let tempFields = item.field //array
          item['value'] = tempFields.map((key) => this.queryParam[key])
        }
      })
    },
    onSubmit: function(params) {
      this.queryParam = params
      this.refresh(true)
    },
    /**
     * 显示条数改变
     * @param {Number} _pageSize
     */
    onPageSizeChange(_pageSize) {
      this.mPager['pageNo'] = 1
      this.mPager['pageSize'] = _pageSize
      this.onBeforeLoad()
    },
    /**
     * 分页的当前页改变时
     * @param {Number} _pageNo
     */
    onPageIndexChange(_pageNo) {
      this.mPager.pageNo = _pageNo
      this.onBeforeLoad()
    },
    /**
     * 表格重新加载方法
     * @param {Boolean} bool 如果参数为 true, 则强制刷新到第一页
     */
    refresh(bool = false, query = {}) {
      if (bool) {
        this.mPager.pageNo = 1
      }
      Object.assign(this.queryParam, query)
      this.onBeforeLoad()
    },
    onBeforeLoad() {
      const params = Object.assign({}, this.query, this.mPager, this.queryParam)
      if (typeof this.beforeLoad === 'function') {
        this.beforeLoad(params, this.loadData)
      } else {
        this.loadData(params)
      }
    },
    /**
     * @description:加载数据方法
     * @param {Object} pager 分页选项器
     * @param {Object} filter 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData(params) {
      if (this.mLoading || !this.url) return
      this.mLoading = true
      this.$emit('load', params) //兼容旧版本
      this.$emit('load-before', params)
      const result = this.$http.get(this.url, {
        params: params,
      })
      try {
        this.$router.replace({ query: params })
      } catch (e) {
        console.warn('this.$router is undefined')
      }

      // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.totalCount, r.data
      result
        .then((response) => {
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (response.data.length === 0 && this.mPager.pageNo > 1) {
            this.mPager.pageNo--
            this.loadData()
            return
          }
          this.mTotal = response.total
          this.mDataSource = response.data
          this.mLoading = false
          this.$emit('load-success')
        })
        .catch(() => {
          this.mTotal = 0
          this.mDataSource = []
          this.mLoading = false
          this.$emit('load-error')
        })
    },
    getData() {
      return this.mDataSource
    },
    bindCellClick(row, column) {
      this.$emit('cell-click', row, column)
      this.$emit('action', column.property, row)
    },
    celldbclick(row, column, cell) {
      const copyValue = row[column.property]
      if (!copyValue) return
      const clipboardDiv = cell
      clipboardDiv.focus()
      window.getSelection().removeAllRanges()
      var range = document.createRange()
      range.setStartBefore(clipboardDiv.firstChild)
      range.setEndAfter(clipboardDiv.lastChild)
      window.getSelection().addRange(range)
      try {
        if (document.execCommand('copy')) {
          this.$message.success('已复制到剪贴板')
        } else {
          this.$message.error('未能复制到剪贴板，请全选后右键复制')
        }
      } catch (err) {
        this.$message.error('未能复制到剪贴板，请全选后右键复制')
      }
    },
  },
}
</script>

<style lang="scss">
.advanced-table {
  flex: 1;
  background-color: white;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  .table-main-warper {
    flex: 1;
  }
  .table-header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: fit-content;
    position: relative;
    align-items: center;
    align-content: center;
  }
  .table-search {
    flex: 1;
  }
  .table-actions {
    margin-right: 40px;
  }
  .v-pagination {
    padding: 20px 0px;
    background: white;
    height: fit-content;
    text-align: right;
    border-top: 1px solid #dcdfe673;
    height: 70px;
    .mdb-pagination {
      float: right;
      margin-right: 20px;
    }
  }
  .el-table::before {
    height: 0;
  }
  .el-table {
    align-self: stretch;
    flex: auto;
    tr {
      height: 55px;
    }
    th {
      background-color: #f0f8ff;
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 20px;
      letter-spacing: 0px;
      color: #8c8c8c;
    }
    td {
      font-family: PingFang SC;
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 20px;
      letter-spacing: 0px;
      color: #272727;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-bottom: 0px solid #ebeef5 !important;
    }
    .cell {
      white-space: nowrap;
    }
    .el-table__expanded-cell[class*='cell'] {
      background: #f2f6fc;
    }
    .el-table__expanded-cell[class*='cell']:hover {
      background: #f2f6fc !important;
    }
  }
  .el-card {
    border-radius: 5px;
  }
}
.online-update-tools {
  position: absolute;
  right: 0px;
  top: 30vh;
  z-index: 1000;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 0px solid #ebeef5 !important;
}
//
//tooltip__popper
.el-tooltip__popper.is-dark {
  background: #fff;
  color: rgb(96, 98, 102);
}
.el-tooltip__popper {
  color: rgb(96, 98, 102);
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  word-break: break-all;
  background: rgb(255, 255, 255);
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(235, 238, 245);
  border-image: initial;
  padding: 12px;
  .popper__arrow,
  .popper__arrow::before {
    border-color: #fff transparent transparent transparent !important;
  }
  .popper__arrow::before {
    border-top-color: #fff !important;
  }
  .popper__arrow::after {
    border-top-color: #fff !important;
  }
}
.el-table__fixed-right::before,
.el-table__fixed::before {
  height: 0px;
}
//修改滚动条样式
.el-table__body-wrapper {
  border-right: #2f2f2f;
  //滚动条整体部分
  &::-webkit-scrollbar {
    width: 6px; //y轴滚动条粗细
    height: 6px; //x轴滚动条粗细
    border-bottom: 1px solid #7b7b7b;
    transition: opacity 0.12s ease-out;
  }
  //滚动条里面的小方块，能上下左右移动（取决于是垂直滚动条还是水平滚动条）
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
    background-color: rgba(144, 147, 153, 0.3);
    margin-bottom: 10px;
    transition: background-color 0.3s;
  }
  //滚动条的轨道（里面装有thumb）滚动槽
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: 0;
    border-radius: 0;
    background: #e7e3e3; //滚动槽背景色
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.12s ease-out;
  }
}
</style>
