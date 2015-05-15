(function() {
  var wordReference = wordReference || {};

  wordReference.translate = function(options) {
    var toLanguage = options.to;
    var fromLanguage = options.from;
    var dictionary = fromLanguage + toLanguage;
    var url = "http://api.wordreference.com/0.8/api-key/json/" + dictionary + "/" + options.term;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
  };

  module.exports = wordReference;
})();
