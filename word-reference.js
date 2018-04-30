(function() {
  var dotenv = dotenv || require("dotenv").load();
  var Promise = require("promise");
  var wordReference = wordReference || {};

  wordReference.baseUrl = "http://api.wordreference.com/0.8";

  wordReference.httpClient = require("request");

  wordReference.getTranslations = function(options) {
    var translationsPromise = new Promise(function(resolve, reject) {
      var httpClient = wordReference.httpClient;
      var url = wordReference.url(options);

      httpClient.get(url, function(error, response, body) {
        if (response.statusCode === 500) {
          reject({ errors: ["Internal Server Error"] });
        } else {
          resolve(JSON.parse(body));
        }
      });
    });

    return translationsPromise;
  };

  wordReference.url = function(options) {
    var dictionary = options.from.concat(options.to);
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
