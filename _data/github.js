const fetch = require("node-fetch");

module.exports = async function () {
  console.log("Fetching new github stargazers count…");

  return fetch("https://api.github.com/repos/creative42/myblog")
    .then(res => res.json())
    .then(json => {
      return {
        stargazers: json.stargazers_count
      };
    });
};
