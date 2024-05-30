import path from 'path';

module.exports = {
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
  externals: {
    sqlite3: 'commonjs sqlite3',
  },
};
