var wordReference = require("../word-reference");

describe(".baseUrl", function() {
  it("returns the base URL for the WordReference API", function() {
    expect(wordReference.baseUrl).toEqual("http://api.wordreference.com/0.8/");
  });
});

describe(".translate", function() {
  var stubXMLHttp = function(xmlHttpDouble) {
    spyOn(xmlHttpDouble, "open");
    spyOn(xmlHttpDouble, "send");
    XMLHttpRequest = function() { return xmlHttpDouble };
  };
  var options = { to: "en", from: "it", term: "malandrina" };
  var apiKey = process.env.WORDREFERENCE_API_KEY;

  it("fetches translation from WordReference", function() {
    var xmlHttp = { open: true, send: true, responseText: "" };
    stubXMLHttp(xmlHttp);
    var dictionary = options.from + options.to;
    var url = [
      wordReference.baseUrl,
      apiKey,
      "json",
      dictionary,
      options.term
    ].join("/");

    wordReference.translate(options);

    expect(xmlHttp.open).toHaveBeenCalledWith("GET", url, false);
    expect(xmlHttp.send).toHaveBeenCalledWith(null);
  });

  it("returns translation", function() {
    var result;
    var responseText = "foo";
    var xmlHttp = { open: true, send: true, responseText: responseText };
    stubXMLHttp(xmlHttp);
    var dictionary = options.from + options.to;

    result = wordReference.translate(options);

    expect(result).toEqual(responseText);
  });
});
