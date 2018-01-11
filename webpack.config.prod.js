import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
    entry: {
        main: './src/index',
        vendor: './src/vendor'
    },
    devtool: 'source-map',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    plugins: [
        // Generate an external css file with a hash in the filename
        new ExtractTextPlugin('[name].[contenthash].css'),

        // Hash files using MD5 so that their names change when the content change
        new WebpackMd5Hash(),

        // Tells React to build in prod mode
        new webpack.DefinePlugin(GLOBALS),

        // Create seperate bundle for vendor libraries
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),

        // Create HTML file that includes reference to bundled JS
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),

        // Minify JS
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/octet-stream',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'image/svg+xml',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        resourceQuery: /^\?global$/,
                        use: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        importLoaders: 1,
                                        minimize: true,
                                        sourceMap: true
                                    }
                                },
                                'postcss-loader'
                            ]
                        })
                    },
                    {
                        test: /\.css$/,
                        use: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        importLoaders: 1,
                                        minimize: true,
                                        sourceMap: true,
                                        modules: true,
                                        localIdentName: '[local]--[hash:base64:5]'
                                    }
                                },
                                'postcss-loader'
                            ]
                        })
                    }
                ]
            }
        ]
    }
};
