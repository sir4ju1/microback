const fs = require('fs')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const config = require('./paths')
const path = require('path')


// This is the Webpack configuration.
// It is focused on developer experience and fast rebuilds.
module.exports = (options) => {
  return {
    target: 'node',
    devtool: 'source-map',
    externals: nodeExternals({
      whitelist: [
        /\.(eot|woff|woff2|ttf|otf)$/,
        /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
        /\.(mp4|mp3|ogg|swf|webp)$/,
        /\.(css|scss|sass|less|styl)$/,
      ]
    }),
    performance: {
      hints: false
    },
    resolve: {
      extensions: ['.js', '.json'],
      modules: [config.userNodeModulesPath, path.resolve(__dirname, '../node_modules')]
    },  
    node: {
      __filename: true,
      __dirname: true
    },
    entry: {
      main: [
        path.resolve(__dirname, '../src/index.js')
      ],
    },
    // This sets the default output file path, name, and compile target
    // module type. Since we are focused on Node.js, the libraryTarget
    // is set to CommonJS2
    output: {
      path: config.serverBuildPath,
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      publicPath: config.publicPath,
      libraryTarget: 'commonjs2'
    },
    // Define a few default Webpack loaders. Notice the use of the new
    // Webpack 2 configuration: module.rules instead of module.loaders
    module: {
      rules: [
        // This is the development configuration.
        // It is focused on developer experience and fast rebuilds.
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        // Process JS with Babel (transpiles ES6 code into ES5 code).
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: [
            /node_modules/,
            config.buildPath
          ],
          options: {
            presets: [
              [
                "env",
                {
                  "targets": { "node": "8" }
                }
              ]
            ],
            plugins: [
              "transform-decorators-legacy",
              [
                "module-resolver",
                {
                  "root": [
                    "./app"
                  ],
                  "alias": {
                    "logic": "./app/logic",
                    "model": "./app/models"
                  }
                }
              ]
            ]
          }
        }
      ]
    },
    plugins: [
      // We define some sensible Webpack flags. One for the Node environment,
      // and one for dev / production. These become global variables. Note if
      // you use something like eslint or standard in your editor, you will
      // want to configure __DEV__ as a global variable accordingly.
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(options.env),
        '__DEV__': options.env === 'development'
      }),
      // In order to provide sourcemaps, we automagically insert this at the
      // top of each file using the BannerPlugin.
      new webpack.BannerPlugin({
        raw: true,
        entryOnly: false,
        banner: `require('${
        // Is source-map-support installed as project dependency, or linked?
        (require.resolve('source-map-support').indexOf(process.cwd()) === 0)
          // If it's resolvable from the project root, it's a project dependency.
          ? 'source-map-support/register'
          // It's not under the project, it's linked via lerna.
          : require.resolve('source-map-support/register')
        }')`
      }),
      // The FriendlyErrorsWebpackPlugin (when combined with source-maps)
      // gives Backpack its human-readable error messages.
      new FriendlyErrorsWebpackPlugin({
        clearConsole: options.env === 'development',
      }),
      // The NoEmitOnErrorsPlugin plugin prevents Webpack
      // from printing out compile time stats to the console.
      new webpack.NoEmitOnErrorsPlugin()
    ]
  }
}