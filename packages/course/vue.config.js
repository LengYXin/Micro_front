const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const env = require('./env.config');
const name = 'xt-course'
console.log("LENG: env", env.config)
const deployPro = env.config.DEPLOY_ENV === 'pro';
module.exports = {
  outputDir: env.config.dir,
  publicPath: env.config.base,
  runtimeCompiler: true,
  css: {
    // modules: true,
    sourceMap: true,
    loaderOptions: {
      less: {
        lessOptions: {
          // modifyVars: modifyVars,
          javascriptEnabled: true
        }
      }
    }
  },
  filenameHashing: true,
  devServer: {
    port: 8001,
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(process.cwd(), 'src/icon.ts'),
      }
    },
    plugins: [
      new env.plugin(),
      new webpack.DefinePlugin(env.process),
      new MomentLocalesPlugin({ localesToKeep: ['es-us', 'zh-cn'] }),
      new webpack.BannerPlugin({ banner: `@author 冷 (https://github.com/LengYXin)\n@email lengyingxin8966@gmail.com` })
    ],
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
    optimization: {
      minimize: deployPro,
      namedModules: !deployPro,
      splitChunks: {
        chunks: 'async',
        cacheGroups: {
          min: {
            name: 'min',
            test: /[\\/]node_modules[\\/](vue.*|mobx.*|core.*|rxjs.*|nuxt.*|.*nuxt.*)[\\/]/,
            chunks: 'all',
          },
          lib: {
            name: 'lib',
            test: /[\\/]node_modules[\\/](ant-.*|@ant-.*|lodash.*|swiper.*|moment.*|viewerjs.*|bn.*|elliptic.*)[\\/]/,
            chunks: 'all',
          }
        }
      }
    },
  },
}