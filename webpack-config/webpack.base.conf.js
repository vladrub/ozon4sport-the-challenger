const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const PATHS = {
    public: path.join(__dirname, '../public'),
    src: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../build'),
    assets: 'assets/',
};

module.exports = {
    externals: {
        paths: PATHS,
    },
    entry: {
        app: PATHS.src,
    },
    output: {
        filename: `${PATHS.assets}js/[name].[contenthash].js`,
        path: PATHS.build,
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    watchOptions: {
        poll: true,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            root: path.join(__dirname, '../'),
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                precision: 6,
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: `./postcss.config.js`,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|giv|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'public/images/',
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'public/fonts/',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            public: path.resolve(__dirname, '../public'),
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            // filename: `${PATHS.assets}css/[name].[contenthash].css`,
            filename: `[name].[contenthash].css`,
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.pug`,
            filename: 'index.html',
        }),
        new CopyPlugin([
            {
                from: `${PATHS.public}`,
                to: 'public/[path][name].[ext]',
                force: true,
            },
        ]),
        new ESLintPlugin(),
        new StyleLintPlugin({
            files: ['**/*.{htm,html,sss,less,scss,sass}'],
        }),
    ],
};
