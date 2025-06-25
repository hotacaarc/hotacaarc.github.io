// .eleventy.js  (リポジトリ直下)
module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "src",          // 入力フォルダ
      includes: "includes",  // 変更なければそのまま
      layouts: "layouts",
      output: "."            // ★ リポジトリ直下に書き出す
    }
  };
};

