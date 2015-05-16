(function() {
  var dotenv = dotenv || require("dotenv").load();
  var wordReference = wordReference || {};

  wordReference.baseUrl = "http://api.wordreference.com/0.8";

  wordReference.translate = function(options, callback) {
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

    http.get(url, function(response) {
      response.on("data", function(data) {
        callback(JSON.parse(data));
      });
    });
  };

  module.exports = wordReference;
})();
