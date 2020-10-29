/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:13:00
 * @modify date 2020-08-05 14:13:00
 * @desc [description]
 */
import { toJS } from "mobx";
import moment from "moment";
import lodash from "lodash";
import { Store } from "vuex";
import Vue from 'vue';
import { EnumApiCurrency } from './api';
import { Regulars, Encryption, AjaxBasics } from './helpers';
import { EnumLocaleDescriptions, EnumLocaleLinks, EnumMessage } from './languages';
// 扩展
Vue.prototype.$EnumApiCurrency = EnumApiCurrency;
Vue.prototype.$EnumLocaleLinks = EnumLocaleLinks;
Vue.prototype.$EnumMessage = EnumMessage;
Vue.prototype.$EnumLocaleDescriptions = EnumLocaleDescriptions;
Vue.prototype.$Regulars = Regulars;
Vue.prototype.$Encryption = Encryption;
Vue.prototype.moment = moment;
/**
 * 检查用户 状态 已登录返回用户信息
 * @visible 吊起 登录框
 */
Vue.prototype.$InspectUser = function (visible = true) {
    const store: Store<any> = this.$store
    if (store.$storeUser.loggedIn) {
        return toJS(store.$storeUser.UserInfo);
    }
    store.$storeUser.onToggleVisible(visible);
    throw undefined
};
/** 
 * 检查code 是否 是当前用户
*/
Vue.prototype.$eqUser = function (code) {
    const store: Store<any> = this.$store
    if (store.$storeUser.loggedIn) {
        const UserInfo = toJS(store.$storeUser.UserInfo);
        return lodash.eq(UserInfo.studentId, code)
    }
    return false
};
/** 
 * 消息提示
 */
Vue.prototype.$msg = function (msg, type) {
    console.warn("LENG: Vue.prototype.$msg -> msg", msg, type)
};
declare module 'vue/types/vue' {
    interface Vue {
        readonly moment: typeof moment;
        /** APi 枚举 */
        readonly $EnumApiCurrency: typeof EnumApiCurrency;
        /** 链接枚举 */
        readonly $EnumLocaleLinks: typeof EnumLocaleLinks;
        /** 消息枚举 */
        readonly $EnumMessage: typeof EnumMessage;
        /** 说明枚举 */
        readonly $EnumLocaleDescriptions: typeof EnumLocaleDescriptions;
        /** 正则表达式 */
        readonly $Regulars: typeof Regulars;
        /** 加密算法 */
        readonly $Encryption: typeof Encryption;
        /** 
         * 检查用户是否登录
         * 没有登录会抛异常。try 包裹使用
         * @visible 吊起 登录框
         */
        readonly $InspectUser: (visible?: Boolean) => any;
        /** 检查code 是否 是当前用户 */
        readonly $eqUser: (code: any) => Boolean;
        /** 消息 提示 */
        readonly $msg: (msg: string, type?: 'success' | 'info' | 'warning' | 'error' | 'loading') => any;
        /** Ajax */
        readonly $ajax: AjaxBasics;
    }
}