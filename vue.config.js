// 配置选项参考 https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE
const webpack = require("webpack");
module.exports = {
  // 部署生产环境和开发环境下的URL。默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  //生成文件的目录名称（要和baseUrl的生产环境路径一致）
  //   outputDir: "dist",
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  //   assetsDir: "assets",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  //webpack配置
  configureWebpack: config => {
    let pluginsWebpack = [
      // 使用ProvidePlugin加载的模块，需要在eslintrc.js的globals里设置
      new webpack.ProvidePlugin({
        axios: "axios"
      })
    ];
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      // 使用DefinePlugin暴露的全局变量，需要在eslintrc.js的globals里设置
      pluginsWebpack.push(
        new webpack.DefinePlugin({
          __PROJECTPATH__: JSON.stringify("")
        })
      );
    } else {
      // 为开发环境修改配置...
      pluginsWebpack.push(
        new webpack.DefinePlugin({
          __PROJECTPATH__: JSON.stringify("/test")
        })
      );
    }
    config.plugins = [...config.plugins, ...pluginsWebpack];
  },
  devServer: {
    // host: "localhost",
    port: 1111, // 端口号
    open: true, //配置自动启动浏览器
    // 设置代理
    proxy: {
      "/test": {
        target: "http://10.5.111.111:8777", // 域名
        ws: true, // 是否启用websockets
        // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，
        // 这样服务端和服务端进行数据的交互就不会有跨域问题
        changOrigin: true,
        pathRewrite: {
          "^/test": ""
        }
      }
    }
  }
};
