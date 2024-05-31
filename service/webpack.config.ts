const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

/**
 * @description: 获取sqlite3二进制文件路径
 * @param {string} platform 运行平台
 * @return {string} 二进制文件路径
 */
function getSqlite3BindingFile(platform) {
  return {
    windows: 'public/sqlite3-v5.1.7-napi-v3-win32-x64/node_sqlite3.node',
    linux: 'public/sqlite3-v5.1.7-napi-v3-linux-x64/node_sqlite3.node'
  }[platform];
}

module.exports = (env) => ({
  mode: 'production',
  target: 'node',
  entry: path.resolve(__dirname, './src/main.ts'),
  output: {
    filename: 'service.js',
    path: path.resolve(__dirname, './dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: getSqlite3BindingFile(env.platform),
          to: './node_sqlite3.node'
        }
      ]
    })
  ]
});
