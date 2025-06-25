module.exports = function (eleventyConfig) {
  /* 追加済み？ なければ必ず入れる */
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("css");  // CSS も同様なら
  /*  …ほかの設定…  */
  return {
    dir: { input: "src", layouts: "layouts", includes: "includes", output: "_site" }
  };
};

