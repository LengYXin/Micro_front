import './public-path';
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import { Component, Prop, Provide, Inject } from "vue-property-decorator";

Antd.install(Vue);
Vue.config.productionTip = false
let instance: any = null;
function render(props: any = {}) {
  const { container, RootStore } = props;
  @Component({
    router,
    render: h => h(App)
  })
  class StartApp extends Vue {
  }
  instance = new StartApp().$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

function storeTest(props: any) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  // storeTest(props);
  render(props);
}

export async function unmount() {
  console.log('[vue] props from main unmount');
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  // router = null;
}

declare module 'vue/types/vue' {
  interface Vue {
    getRootStore: () => any;
  }
}