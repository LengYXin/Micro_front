import {
    AjaxBasics,
    ControllerAbout,
    ControllerCourse,
    ControllerHome,
    ControllerHomework,
    ControllerMy,
    ControllerOrder,
    ControllerStationery,
    ControllerUser,
    ControllerVideo,
    ControllerWechat
} from "@xt/client";
import lodash from "lodash";
import { create, persist } from "mobx-persist";
import NProgress from 'nprogress';
import { TimeoutError } from "rxjs";
import { AjaxError, AjaxResponse } from "rxjs/ajax";
import $global, { XTGlobal } from "./global";
import { XTLocale } from "./locale";
import { XTMenu } from "./menu";
/**
 * 创建 全局状态
 * @param ajax 
 */
export function onCreateRootStore(ajax: AjaxBasics = new AjaxBasics({ target: $global.target })) {
    const RootStore = {
        // 全局
        $global: $global,
        // ajax
        $ajax: ajax,
        // 语言
        $locale: new XTLocale(),
        // 菜单w
        $menu: new XTMenu(),
        // 首页
        $storeHome: new ControllerHome(ajax),
        // 课程
        $storeCourse: new ControllerCourse(ajax),
        // 文房
        $storeStationery: new ControllerStationery(ajax),
        // 视频
        $storeVideo: new ControllerVideo(ajax),
        // 关于
        $storeAbout: new ControllerAbout(ajax),
        // 订单
        $storeOrder: new ControllerOrder(ajax),
        // 作业
        $storeHomework: new ControllerHomework(ajax),
        // 用户
        $storeUser: new ControllerUser(ajax),
        // 微信
        $wechat: new ControllerWechat(ajax, $global.appid),
        // 我的
        $my: new ControllerMy(ajax)
    }
    /**
     * 配置缓存数据
     */
    async function onCreatePersist() {
        // https://github.com/pinqy520/mobx-persist
        const hydrate = create({
            // storage: window.localStorage,   // or AsyncStorage in react-native.
            // default: localStorage
            // jsonify: true  // if you use AsyncStorage, here shoud be true
            // default: true
        });
        // 配置缓存字段
        persist({ locale: true })(RootStore.$locale);
        persist({ Banners: { type: "list" } })(RootStore.$storeHome);
        persist({ typelist: { type: "list" } })(RootStore.$storeStationery);
        persist({ typelist: { type: "list" } })(RootStore.$storeAbout);
        persist({ typelist: { type: "list" } })(RootStore.$storeOrder);
        persist({ UserInfo: { type: "object" } })(RootStore.$storeUser);
        // 设置类
        hydrate(`${$global.localStorageStartsWith}locale`, RootStore.$locale);
        hydrate(`${$global.localStorageStartsWith}Home`, RootStore.$storeHome);
        hydrate(
            `${$global.localStorageStartsWith}Stationery`,
            RootStore.$storeStationery
        );
        hydrate(`${$global.localStorageStartsWith}About`, RootStore.$storeAbout);
        hydrate(`${$global.localStorageStartsWith}Order`, RootStore.$storeOrder);
        await hydrate(`${$global.localStorageStartsWith}User`, RootStore.$storeUser);
        RootStore.$storeUser.onGetUserInfo();
    }
    /**
     * 扩展 AjaxBasics 配置
     */
    function onResetAjaxBasics(message: (error) => void) {
        AjaxBasics.onMergeBody = function () {
            return RootStore.$storeUser.onSignatureUser()
        }
        // 过滤
        AjaxBasics.onFilter = function (res) {
            // 数据 Response 
            if (res instanceof AjaxResponse) {
                // 无 响应 数据
                if (lodash.isNil(res.response)) {
                    // throw lodash.merge(res, $global.production ? { message: '服务器开小差了' } : { message: '响应体不存在' })
                }
                else if (!lodash.eq(lodash.get(res.response, 'code', 0), 0)) {
                    throw lodash.merge(res, { message: lodash.get(res.response, 'msg') })
                }
            }
            // 错误 超时
            if (res instanceof AjaxError || res instanceof TimeoutError) {
                console.error("LENG: AjaxBasics.onFilter -> res", res)
                throw { message: '服务器开小差了' };
            }
            return true
        }
        AjaxBasics.onMap = function (res) {
            return lodash.get(res, 'response.result', res.response || res);
        }
        AjaxBasics.onError = function (error) {
            if (lodash.includes([600002, 900004], lodash.get(error, 'response.code'))) {
                RootStore.$storeUser.onOutLogin()
                RootStore.$storeUser.onToggleVisible(true)
                return
            }
            message(error)
            // notification.error({ key: "AjaxBasics", message: '提示', description: lodash.get(error, 'response.msg', error.message) })
            // message.error({ content: lodash.get(error, 'response.msg', error.message), key: 'message' })
        }
        AjaxBasics.onNProgress = function (type: 'start' | 'done' = 'start') {
            if (type == "start") {
                NProgress.start();
            } else {
                NProgress.done();
            }
        }
    }
    return {
        ajax,
        RootSrore: RootStore,
        onCreatePersist,
        onResetAjaxBasics
    }
};


// 扩展 ts
declare module "vuex/types/index" {
    interface Store<S> {
        /** 请求 */
        $ajax: AjaxBasics;
        /**
         * 全局公用
         */
        readonly $global: XTGlobal;
        /**
         * 菜单
         */
        readonly $menu: XTMenu;
        /**
         * 本地语音全局状态
         */
        readonly $locale: XTLocale;
        /**
         * 首页状态控制器
         */
        readonly $storeHome: ControllerHome;
        /**
         * 课程控制器
         */
        readonly $storeCourse: ControllerCourse;
        /**
         * 文房
         * @type {ControllerStationery}
         * @memberof Store
         */
        readonly $storeStationery: ControllerStationery;
        /**
         * 视频
         * @type {ControllerStationery}
         * @memberof Store
         */
        readonly $storeVideo: ControllerVideo;
        /**
         * 关于
         * @type {ControllerAbout}
         * @memberof Store
         */
        readonly $storeAbout: ControllerAbout;
        /**
         * 订单
         * @type {ControllerOrder}
         * @memberof Store
         */
        readonly $storeOrder: ControllerOrder;

        readonly $storeHomework: ControllerHomework;
        /**
         * 用户
         * @type {ControllerUser}
         * @memberof Store
         */
        readonly $storeUser: ControllerUser;
        /**
            * 微信
            * @type {ControllerMy}
            * @memberof Store
            */
        readonly $wechat: ControllerWechat;
        /**
         * 我的
         * @type {ControllerMy}
         * @memberof Store
         */
        readonly $my: ControllerMy;
    }
}