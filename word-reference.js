(function() {
  var dotenv = dotenv || require("dotenv").load();
  var http = require("http");
  var Promise = require("promise");
  var wordReference = wordReference || {};

  wordReference.baseUrl = "http://api.wordreference.com/0.8";

  wordReference.getTranslations = function(options) {
    var translationsPromise = new Promise(function(resolve, reject) {
      var url = wordReference.url(options);
      http.get(url, function(response) {
        var responseBody = "";
        response.setEncoding("utf8");
        response.on("data", function(data) { responseBody += data; });

        response.on("end", function() {
          if (response.statusCode === 500) {
            reject({ errors: ["Internal Server Error"] });
          } else {
            resolve(JSON.parse(responseBody));
          }
        });
      });
    });

    return translationsPromise;
  };

  wordReference.url = function(options) {
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

    return url;
  };

  module.exports = wordReference;
})();
