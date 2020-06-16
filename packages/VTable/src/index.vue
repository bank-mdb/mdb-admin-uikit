<!--
 * @Author: peter
 * @Date: 2019-05-16 10:10:22
 * @Description: 公共库表格，可自定义多种单元格样式
 -->
<template>
  <!-- 表格区 v-scrollBar data-simplebar-->
  <el-table ref="vTable" v-bind="$attrs" v-on="$listeners">
    <template v-slot:empty>
      <div class="vtable-empty">
        <svg-icon class="vtable-empty-icon" :icon-class="empty.icon"></svg-icon>
        <p class="vtable-empty-tips">{{ empty.message }}</p>
        <el-button
          class="vtable-empty-action"
          type="primary"
          v-if="empty.action.text"
          @click="toAction"
          >{{ empty.action.text }}</el-button
        >
      </div>
    </template>
    <!-- checkbox -->
    <el-table-column v-if="isMutiSelect" type="selection" />

    <el-table-column v-if="expand" type="expand">
      <template slot-scope="scope">
        <colum-render :row="scope.row" :render="expand.render" />
      </template>
    </el-table-column>
    <!-- index -->
    <el-table-column
      v-if="hasIndex"
      type="index"
      width="80"
      label="序号"
      align="center"
    />
    <!-- 数据显示区 -->
    <template v-for="(col, index) in columns">
      <!-- other -->
      <el-table-column
        :prop="col.prop"
        :key="col.label + index"
        :align="col.align || 'center'"
        :label="col.label"
        :width="col.width || 'auto'"
        :sortable="col.sortable ? 'custom' : false"
        :fixed="col.actions ? 'right' : col.fixed || false"
        show-overflow-tooltip
        :render-header="handleRenderHeader"
      >
        <template slot-scope="scope">
          <!-- //NO1.formatter -->
          <template v-if="col.formatter">
            <div v-html="col.formatter(scope.row[col.prop], scope.row)"></div>
          </template>
          <!-- //NO2.自定义render -->
          <template v-else-if="col.render">
            <colum-render
              :column="col"
              :row="scope.row"
              :render="col.render"
              :index="index"
            ></colum-render>
          </template>
          <template v-else-if="col.actions && col.actions.length > 0">
            <template v-for="(btn, idx) in col.actions">
              <el-button
                v-if="!btn.check"
                :key="idx"
                :type="btn.type"
                size="mini"
                style="margin:0px;padding: 0 4px;"
                round
                @click="btn.click(index, scope.row, scope)"
                >{{ btn.label }}</el-button
              >
              <el-button
                v-else
                :key="idx"
                :type="btn.type"
                size="mini"
                round
                style="margin:0px;padding: 0 4px;"
                v-show="btn.check(index, scope.row, scope)"
                @click="btn.click(index, scope.row, scope)"
                >{{ btn.label }}</el-button
              >
            </template>
          </template>
          <!-- //NO3 动态插槽 -->
          <template v-else-if="col.slot">
            <slot :name="col.slot" :row="scope.row" :index="scope.$index" />
          </template>
          <template v-else>
            <span
              :class="col.customClass"
              v-html="
                filterColumn(scope.row[col.prop], col, scope.column, index)
              "
            ></span>
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
// import columRender from "./ColumRender.js";
import Vue from 'vue'
const columRender = {
  name: 'ColumRender',
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index,
    }
    if (ctx.props.column) params.column = ctx.props.column
    return ctx.props.render(h, params)
  },
}
export default {
  name: 'VTable',
  inheritAttrs: false,
  components: { columRender },
  props: {
    hasIndex: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    expand: {
      type: Object,
      required: false,
    },
    empty: {
      type: Object,
      default: function() {
        return {
          icon: 'empty',
          message: '暂无数据！',
          action: { text: '', link: '' },
        }
      },
    },
  },
  data() {
    return {
      mRowSelected: [],
      mDataSource: [],
      sortOrders: ['DESC', 'ASC'],
    }
  },
  methods: {
    handleRenderHeader(h, { column, $index }) {
      let temp = this.columns[$index - 1]
      if (!temp['tips']) {
        return column.label
      } else {
        return [
          column.label,
          h(
            'el-tooltip',
            {
              props: {
                content: temp.tips,
                placement: 'top',
              },
            },
            [
              h('span', {
                class: {
                  'el-icon-question': true,
                },
              }),
            ]
          ),
        ]
      }
    },
    bindActionsClick(prop, row) {
      this.$emit('action', prop, row)
    },
    toAction() {
      if (this.empty && this.empty.action.link) {
        this.$router.push({ path: this.empty.action.link })
      }
    },
    /**
     * @description: 用于多选表格，切换所有行的选中状态
     */
    toggleAllSelected() {
      this.$refs.vTable.toggleAllSelection()
    },

    /**
     * @description: 设置选中项
     * @param {Array} selectedRows
     */
    updateSelected(selectedRows) {
      if (selectedRows) {
        this.mRowSelected = selectedRows
        selectedRows.forEach((row) => {
          this.$refs.vTable.toggleRowSelection(row)
        })
      }
    },
    /**
     * @description: 清空 table 已选中项
     */
    clearSelected() {
      if (this.mRowSelected) {
        this.mRowSelected = []
        this.$refs.vTable.clearSelection()
      }
    },
    filterColumn(value, col, column, index) {
      const columsAvgWidth = this.columsWidth
      const columnWidth = this.columns[index]['width'] || 0
      if (value) {
        if (/^(\d{4})(-)(\d{2})(-)(\d{2})$/.test(value) && columnWidth < 100) {
          //date
          Vue.set(this.columns[index], 'width', 100)
        } else if (
          /^(\d{4})(-)(\d{2})(-)(\d{2})\W+/.test(value) &&
          columnWidth < 160
        ) {
          //datetime
          Vue.set(this.columns[index], 'width', 160)
        } else if (
          /[\u4E00-\u9FA5]+/.test(value) &&
          columsAvgWidth < 160 &&
          columnWidth < 160
        ) {
          //中文
          Vue.set(
            this.columns[index],
            'width',
            Math.max(String(value).length * 20, 160)
          )
        } else if (
          /^\w+$/.test(value) &&
          columsAvgWidth < String(value).length * 11 &&
          columnWidth < String(value).length * 11
        ) {
          //纯数字+字母
          Vue.set(
            this.columns[index],
            'width',
            Math.max(String(value).length * 11, 160)
          )
        } else if (
          /^[0-9.]*$/.test(value) &&
          columsAvgWidth < 160 &&
          columnWidth < 160
        ) {
          //纯数字
          Vue.set(this.columns[index], 'width', 160)
        } else if (
          /^[a-zA-Z]+$/.test(value) &&
          columsAvgWidth < String(value).length * 10 &&
          columnWidth < String(value).length * 10
        ) {
          Vue.set(
            this.columns[index],
            'width',
            Math.max(160, String(value).length * 10)
          )
        }
      }

      if (col.filter) {
        const globalFilter = Vue.filter(col.filter)
        if (globalFilter) {
          return globalFilter(value)
        }
      }
      return value
    },
  },
  computed: {
    //根据是否设置了事件，来显示多选
    hasData() {
      return this.$attrs.data.length > 0
    },
    isMutiSelect: function() {
      return (
        this.$listeners['selection-change'] ||
        this.$listeners.selectionAll ||
        this.$listeners.select
      )
    },
    columsWidth: function() {
      const bodyWidth = document.body.clientWidth
      return (bodyWidth - 200) / this.columns.length
    },
  },
}
</script>
<style lang="postcss" scoped>
.vtable-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 120px;
}
.vtable-empty-icon {
  height: 120px;
  width: 120px;
}
.vtable-empty-tips {
  line-height: 13px;
  font-size: 14px;
  padding-left: 13px;
}
.vtable-empty-action {
  margin-top: 20px;
  padding: 10px 30px;
}
</style>
<style>
.el-table__empty-text {
  line-height: 0px;
}
.simplebar-content-wrapper {
  overflow: auto;
}
</style>
