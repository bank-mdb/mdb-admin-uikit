<template>
  <breadcrumb :appBreadList="appBreadList" class="app-main-bread"></breadcrumb>
</template>
<script>
export default {
  name: 'BreadcrumbDemo',
  data() {
    return {
      appBreadList: [
        {
          path: '/data-source-m/list',
          fullPath:
            '/data-source-m/list?dataScope=CUSTOMER&tab_index=2&pageNo=1&pageSize=10',
          meta: { title: '数据源管理' },
        },
      ],
    }
  },
}
</script>
