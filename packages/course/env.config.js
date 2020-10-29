let config = require('@xt/client/config/env.config');
const lodash = require('lodash');
const path = require('path');
const fs = require('fs');
const production = process.env.NODE_ENV === 'production';
config = lodash.merge(config, {
    base: production ? '/childrens/course/' : '/'
})
// 环境配置
module.exports = {
    config,
    /** 传入 webpack DefinePlugin  */
    process: lodash.mapValues(lodash.mapKeys(config, (value, key) => {
        return `process.env.${key}`
    }), value => JSON.stringify(value)),
    /** webpakc 更改 env.config.js  插件 */
    plugin: class {
        apply(compiler) {
            const { options } = compiler;
            compiler.plugin('done', compilation => {
                // console.log("LENG: apply -> compilation", compilation)
                try {
                    const envPath = path.join(options.output.path, 'env.config.js');
                    if (fs.existsSync(envPath)) {
                        const envjs = fs.readFileSync(envPath).toString();
                        const newEnvjs = lodash.template(envjs, { interpolate: /\({([\s\S]+?)}\)/g })({
                            env: JSON.stringify(config, null, 4)
                        });
                        fs.writeFileSync(envPath, newEnvjs);
                    }
                } catch (error) {
                    console.log("env failed", error);
                }
            })
        }
    }
} 