const fs = require("fs");
const timeToRead = require('eleventy-plugin-time-to-read');
//const youTube = require('eleventy-plugin-youtube-video');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { format } = require('date-fns');

module.exports = function (eleventyConfig) {

  // Add plugins
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);

  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Alias `layout: post` to `layout: layouts/post.njk`
  eleventyConfig.addLayoutAlias(
    "post",
    "layouts/post.njk"
  );

  // Copy static folders and assets to the output
  eleventyConfig.addPassthroughCopy("css");

  function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  }

  eleventyConfig.addFilter("filterTagList", filterTagList);

  // Create an array of all tags
  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    const postdate = format(dateObj, 'do MMMM, yyyy');
    return postdate;
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    const htmlDate = format(dateObj, 'yyyy-LL-dd');
    return htmlDate;
  });

  eleventyConfig.addFilter("pageCount", function (pageSize) {
    var result = (pageSize - Math.floor(pageSize)) !== 0;

    if (result) { pageSize += 1; }
    return pageSize.toFixed(0);
  });

  eleventyConfig.addPlugin(lazyImagesPlugin);
  eleventyConfig.addPlugin(timeToRead);
  //eleventyConfig.addPlugin(youTube);

  eleventyConfig.on('beforeBuild', () => {
    // Run me before the build starts
    console.log("Triggering the build process...");
  });

  eleventyConfig.on('afterBuild', () => {
    // Run me after the build ends
    console.log("Build process has completed!")
  });

  eleventyConfig.on('beforeWatch', (changedFiles) => {
    // changedFiles is an array of files that changed
    // to trigger the watch/serve build
    console.log(">>> Changed files: ", changedFiles)
  });

  //eleventyConfig.addWatchTarget("./styles/sass/");
  eleventyConfig.addPassthroughCopy("./styles/");
  eleventyConfig.addPassthroughCopy("./img");

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync('_site/404/index.html');

        browserSync.addMiddleware("*", (req, res) => {
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
    open: true
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: false,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};