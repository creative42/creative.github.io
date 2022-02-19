module.exports = function (eleventyConfig) {

    eleventyConfig.addShortcode(
        'youtube',
        require('./youtube.shortcode')
    );
};