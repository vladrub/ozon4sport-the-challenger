const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.conf');
const PATHS = baseWebpackConfig.externals.paths;

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [],
    output: {
        filename: `${PATHS.assets}js/[name].[contenthash].js`,
        path: PATHS.build,
        publicPath: '',
    },
});

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig);
});
