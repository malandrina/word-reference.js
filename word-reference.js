(function() {
  var dotenv = dotenv || require("dotenv").load();
  var wordReference = wordReference || {};

  wordReference.baseUrl = "http://api.wordreference.com/0.8/";

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

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
  };

  module.exports = wordReference;
})();
