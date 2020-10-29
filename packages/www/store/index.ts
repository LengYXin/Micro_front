
import '@xt/client/prototype';
import { message } from 'ant-design-vue';
import Vue from 'vue';
import RootSrore, { ajax } from '~/store/create';
import images from './images';
// 状态 导出
export default () => {
    return RootSrore
};
Vue.prototype.$ajax = ajax
/** 
 * 消息提示
 */
Vue.prototype.$msg = function (msg, type: any = "warning") {
    console.warn("LENG: Vue.prototype.$msg -> msg", msg, type)
    if (msg) {
        message.open({ key: msg, content: this.$tc(msg), type })
    }
};
// 扩展
Vue.prototype.$images = images;
/** 
 * 设置 面包屑
*/
Vue.prototype.$setBreadcrumb = RootSrore.$menu.setBreadcrumb;
declare module 'vue/types/vue' {
    interface Vue {
        /** 设置面包屑 */
        readonly $setBreadcrumb: typeof RootSrore.$menu.setBreadcrumb;
        /** APi 枚举 */
        readonly $images: typeof images;
    }
}