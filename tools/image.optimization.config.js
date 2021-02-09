module.exports = {
    makeWebp: false, // option to make or not to make .webp images during the process of optimization
    src: './src/assets/images/', // src folder. Must exist
    dest: './public/images/', // destination folder. Must exist
    // pngQuality: [1, 1], // pngquant quality option (https://www.npmjs.com/package/imagemin-pngquant#quality)
    webpQuality: 80, // webp quality in percents
    jpegQuality: 90, // jpg quality in percents
    logLevel: 'verbose', // todo: add logLevel
};
