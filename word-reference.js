(function() {
  var dotenv = dotenv || require("dotenv").load();
  var Promise = require("promise");
  var wordReference = wordReference || {};

  wordReference.baseUrl = "http://api.wordreference.com/0.8";

  wordReference.translate = function(options) {
    var dictionary = options.from + options.to;
    var apiKey = process.env.WORDREFERENCE_API_KEY;
    var format = "json";
    var url = [
      wordReference.baseUrl,
      apiKey,
      format,
      dictionary,
      options.term
    ].join("/");

    var translationsPromise = new Promise(function(resolve, _reject) {
      http.get(url, function(response) {
        response.on("data", function(data) {
          resolve(data);
        });
      });
    });

    return translationsPromise;
  };

  module.exports = wordReference;
})();
