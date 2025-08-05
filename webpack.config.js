const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
dotenv.config();
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const baseUrl = process.env.baseUrl;
const staticUrl = process.env.staticUrl;
const node_env = process.env.NODE_ENV || "development";

console.log("当前环境：", node_env);

const env = dotenv.config().parsed || {};

// 自动将所有环境变量转换为webpack可用的格式
const envKeys = {
  "process.env": JSON.stringify(env),
};

module.exports = {
  mode: node_env,
  target: ["web", "es5"], // 明确指定目标环境
  optimization: {
    usedExports: true,
    minimize: true,
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|react-router|redux)[\\/]/,
          name: "react-vendor",
          priority: 20,
        },
        antdMobile: {
          test: /[\\/]node_modules[\\/](antd-mobile|antd-mobile-icons)[\\/]/,
          name: "antd-mobile",
          priority: 20,
        },
        moment: {
          test: /[\\/]node_modules[\\/](moment)[\\/]/,
          name: "moment",
          priority: 15,
        },
        vendor: {
          test: /[\\/]node_modules[\\/](?!(react|react-dom|react-router-dom)[\\/])/,
          name: "vendor",
          priority: 10,
        },
        common: {
          name: "common",
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
  },
  entry: "./src/index.tsx",
  devtool: node_env === "development" ? "source-map" : false,
  devServer: {
    host: "localhost",
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: `/${baseUrl}/`,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: {
      rewrites: [
        {
          from: new RegExp(`^/${baseUrl}/`),
          to: `/${baseUrl}/index.html`,
        },
      ],
    },
    hot: true,
    port: 8001,
    server: {
      type: "https",
    },
    proxy: [
      {
        context: ["/apilocal"],
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/apilocal": "",
        },
      },
      {
        context: ["/apidev"],
        target: "https://visualstreet.cn/apidev",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/apidev": "",
        },
      },
      {
        context: ["/api"],
        target: "https://visualstreet.cn/api",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "",
        },
      },
    ],
    // 新增open和client配置
    open: false,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    // 新增fallback配置，解决webpack 5中的polyfill问题
    fallback: {
      path: false,
      fs: false,
      crypto: false,
      stream: false,
      buffer: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.module\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      // webpack 5使用新的资源模块类型
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    // CleanWebpackPlugin在webpack 5中可以被output.clean替代，但为了兼容性保留
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: "控制台",
      filename: "index.html",
      inject: true,
      template: path.resolve(__dirname, "index.html"),
    }),
    new webpack.DefinePlugin(envKeys),
    // 添加webpack 5推荐的资源分析插件
    new webpack.ProgressPlugin(),
  ],
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // webpack 5中内置的清理功能，替代CleanWebpackPlugin
    libraryTarget: "umd",
    // umdNamedDefine已废弃，使用library.name代替
    library: {
      type: "umd",
      name: "app",
    },
    publicPath:
      node_env == "development" ? `/${baseUrl}/` : `${staticUrl}/${baseUrl}/`,
    // 添加webpack 5的资源模块输出配置
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  // 新增缓存配置，提高构建性能
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  // 性能提示配置
  performance: {
    hints: node_env === "production" ? "warning" : false,
    maxAssetSize: 300000,
    maxEntrypointSize: 500000,
  },
};
