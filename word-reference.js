(function() {
  var dotenv = dotenv || require("dotenv").load();
  var http = require("http");
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

    var translationsPromise = new Promise(function(resolve, reject) {
      http.get(url, function(response) {
        var responseBody = "";
        response.setEncoding("utf8");
        response.on("data", function(data) {
          responseBody += data;
        });

        response.on("end", function() {
          if (response.statusCode === "500") {
            reject();
          } else {
            resolve(JSON.parse(responseBody));
          }
        });
      });
    });

    return translationsPromise;
  };

  module.exports = wordReference;
})();
