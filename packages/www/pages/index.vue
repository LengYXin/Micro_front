/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <div class="xt-home">
    <xt-ck-editor />
    <a-divider></a-divider>
    <xt-grid :GridOptions="GridOptions" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { GridOptions } from "ag-grid-community";
@Observer
@Component({
  name: "PageIndex",
  async asyncData(ctx) {
    // 加载课程静态数据
    const res = await ctx.store.$ajax.get(
      "/assets/mocks/home.json",
      {},
      {},
      { target: "/" }
    );
    return {
      dataSource: res,
    };
  },
  fetch(ctx) {
    ctx.store.$storeHome.onGetBanners();
  },
  components: {},
})
export default class PageIndex extends Vue {
  size = "small";
  get PageStore() {
    return this.$store.$storeHome;
  }
  GridOptions: GridOptions = {
    frameworkComponents: {
      // 传递 行 操作组件 自动注册 Action 列
      // Action
    },
    context: {
      PageStore: this.PageStore,
    },
    columnDefs: [
      {
        headerName: "账号",
        field: "ITCode",
        // 自定义 多语言
        // headerValueGetter: (params) => ({ 'zh-CN': '姓名', 'en-US': "Name" }[lodash.get(params, 'context.locale')])
      },
      {
        headerName: "姓名",
        field: "Name",
      },
      {
        headerName: "性别",
        field: "Sex",
      },
      {
        headerName: "照片",
        field: "PhotoId",
        cellRenderer: "avatar",
      },
      {
        headerName: "是否有效",
        field: "IsValid",
        cellRenderer: "switch",
      },
      {
        headerName: "角色",
        field: "RoleName_view",
      },
      {
        headerName: "用户组",
        field: "GroupName_view",
      },
    ],
  };
  created() {}
  mounted() {
    console.log("LENG: PageView -> mounted -> this", this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
.xt-home-swiper-pagination {
  position: absolute;
  text-align: center;
  transition: 300ms opacity;
  transform: translate3d(0, 0, 0);
  z-index: 10;
  .swiper-pagination-bullet-active {
    background: #ffffff;
  }
}
</style>

<style lang="less" scoped>
.swiper-button {
  &-prev {
    color: #ffffff;
  }
  &-next {
    color: #ffffff;
  }
}
</style>