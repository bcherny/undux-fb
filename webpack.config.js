const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MappingPlugin = require('webpack-mapping-plugin').default
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')
// const path = require('path')

// console.log('path!!', path.join(__dirname, '/node_modules/undux/dist.esnext/index.js'))

const importPlugin = tsImportPluginFactory([{
    libraryName: 'rxjs/operators',
    libraryDirectory: '../_esm5/internal/operators',
    camel2DashComponentName: false,
    transformToDefaultImport: false
  },
  {
    libraryName: 'rxjs',
    libraryDirectory: '../_esm5/internal/observable',
    camel2DashComponentName: false,
    transformToDefaultImport: false,
  }
])

module.exports = {
  mode: 'production',
  devtool: 'none',
  entry: './src/index.ts',
  externals: {
    react: 'React'
  },
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test: /\.(jsx|tsx|js|ts)$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        getCustomTransformers: () => ({
          before: [importPlugin]
        })
      },
      exclude: /node_modules/
    }]
  },
  plugins: [
    new MappingPlugin({
      'rxjs': 'rxjs/internal/Observable',
      // rxjs: 'rxjs/_esm2015',
      'typed-rx-emitter': 'typed-rx-emitter/dist.esnext',
      undux: 'undux/dist.esnext'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: './report.html'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          output: {
            beautify: true
          },
          compress: {
            booleans: false,
            collapse_vars: false,
            comparisons: false,
            conditionals: false,
            dead_code: true,
            drop_console: false,
            drop_debugger: true,
            evaluate: false,
            expression: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            if_return: false,
            inline: false,
            join_vars: false,
            keep_classnames: true,
            keep_fargs: true,
            keep_fnames: true,
            keep_infinity: true,
            loops: false,
            negate_iife: false,
            passes: 1,
            properties: true,
            reduce_funcs: false,
            reduce_vars: false,
            sequences: false,
            side_effects: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            unsafe: false,
            unused: false,
            warnings: false
          },
          ecma: 6,
          keep_classnames: true,
          keep_fnames: true,
          mangle: false
        }
      }),
    ],
  }
}