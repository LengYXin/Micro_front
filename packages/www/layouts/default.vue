<template>
  <a-config-provider v-bind="config">
    <pro-layout
      v-bind="layoutConfig"
      :handleMediaQuery="handleMediaQuery"
      :handleCollapse="handleCollapse"
    >
      <template v-slot:menuHeaderRender>
        <div>
          <img :src="$images.title" />
          <h1>Pro Layout</h1>
        </div>
      </template>
      <template v-slot:headerContentRender>
        <div>headerContentRender</div>
      </template>
      <template v-slot:rightContentRender> </template>
      <template v-slot:footerRender>
        <div></div>
      </template>
      <setting-drawer :settings="layoutConfig" @change="handleSettingChange" />
      <Nuxt :keep-alive="keepAlive" :keepAliveProps="keepAliveProps" />
      <div ref="content"></div>
    </pro-layout>
  </a-config-provider>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import lodash from "lodash";
import register from "../plugins/register";
import ProLayout, {
  SettingDrawer,
  PageHeaderWrapper,
} from "../components/pro-layout";
@Component({
  components: { ProLayout, SettingDrawer, PageHeaderWrapper },
})
export default class extends Vue {
  get config() {
    return {
      autoInsertSpaceInButton: false,
      locale: { zh: zh_CN, en: null }[this.$store.$locale.locale],
    };
  }
  get pageClass() {
    return "xt-page-" + this.$route.name;
  }
  get production() {
    return this.$store.$global.production;
  }
  get keepAlive() {
    return true; //this.$store.$global.production;
  }
  get version() {
    return this.$store.$global.version;
  }
  // https://github.com/vueComponent/pro-layout/blob/master/README.zh-CN.md
  layoutConfig = {
    menus: [
      {
        meta: {
          keepAlive: true,
          icon: "smile",
          title: "浏览器",
        },
        path: "/bowser",
        name: "bowser",
      },
      {
        meta: {
          keepAlive: true,
          icon: "smile",
          title: "测试",
        },
        path: "/locale",
        name: "locale",
      },
      {
        meta: {
          keepAlive: true,
          icon: "smile",
          title: "子页面",
        },
        path: "/course",
      },
      {
        meta: {
          keepAlive: true,
          icon: "smile",
          title: "子页面2",
        },
        path: "/course2",
      },
    ],
    collapsed: false,
    autoHideHeader: false,
    query: {},
    layout: "sidemenu",
    contentWidth: "Fluid",
    theme: "dark",
    isMobile: false,
    fixedHeader: true,
    fixSiderbar: true,
    colorWeak: false,
    // settings: {
    //   // 布局类型
    //   layout: "sidemenu", // 'sidemenu', 'topmenu'
    //   // CONTENT_WIDTH_TYPE
    //   contentWidth: "Fluid",
    //   // 主题 'dark' | 'light'
    //   theme: "dark",
    //   // 主色调
    //   primaryColor: "#52C41A",
    //   fixedHeader: false,
    //   fixSiderbar: false,
    //   colorWeak: false,
    //   hideHintAlert: false,
    //   hideCopyButton: false,
    // },
  };
  keepAliveProps = {
    include: [],
  };
  handleMediaQuery() {}
  handleCollapse() {}
  handleSettingChange(settings) {
    lodash.set(this.layoutConfig, settings.type, settings.value);
  }
  mounted() {
    console.log(this);
    register({}, this.$refs.content as any, (loader) => {
      console.log("LENG: extends -> mounted -> loader", loader);
    });
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
.page-enter-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
<style lang="less" scoped>
</style>
