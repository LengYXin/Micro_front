const moment = require('moment');
const lodash = require('lodash');
const DEPLOY_ENV = process.env.DEPLOY_ENV || 'dev';
// 环境配置
module.exports = {
    dir: `build_${lodash.snakeCase(process.env.npm_package_version)}/${DEPLOY_ENV}`,
    // 路由 base
    base: '/',
    // https://zh.nuxtjs.org/api/configuration-build
    publicPath: '/assets/',
    // 微信 App id
    appid: getWXAppid(),
    // 阿里云日志
    logger: getLogger(),
    // 域名
    domain: getDomain(),
    // api 地址
    target: getTarget(),
    // socket
    socket: getSocket(),
    // 版本号
    version: process.env.npm_package_version,
    // 构建时间
    timestamp: moment().format("YYYY-MM-DD HH:mm"),
    // 环境 uat pro
    DEPLOY_ENV: DEPLOY_ENV,
    // NODE_ENV
    NODE_ENV: process.env.NODE_ENV,
};
/**
 * API target
 * @param {*} env 
 */
function getTarget(env = DEPLOY_ENV) {
    const config = {
        pro: '',
        uat: '',
        test: '',
        dev: ''
    }
    return lodash.get(config, env, config.dev)
}
/**
 * Socket target
 * @param {*} env 
 */
function getSocket(env = DEPLOY_ENV) {
    const config = {
        pro: '',
        uat: '',
        test: '',
        dev: ''
    }
    return lodash.get(config, env, config.dev)
}

/**
 * BrowerLogger Pid
 * @param {*} env 
 */
function getLogger(env = DEPLOY_ENV) {
    const config = {
        pro: "",
        uat: "",
        test: '',
        dev: ''
    }
    return lodash.get(config, env, config.dev)
}
/**
 * 微信 微信 Appid
 * @param {*} env 
 */
function getWXAppid(env = DEPLOY_ENV) {
    const config = {
        pro: '',
        uat: '',
        test: '',
        dev: ''
    }
    return lodash.get(config, env, config.dev)
}
/**
 * 域名
 * @param {*} env 
 */
function getDomain(env = DEPLOY_ENV) {
    const config = {
        pro: '',
        uat: '',
        test: '',
        dev: ''
    }
    return lodash.get(config, env, config.dev)
}