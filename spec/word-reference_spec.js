var wordReference = require("../src/word-reference");

describe(".translate", function() {
  var stubXMLHttp = function(xmlHttpDouble) {
    spyOn(xmlHttpDouble, "open");
    spyOn(xmlHttpDouble, "send");
    XMLHttpRequest = function() { return xmlHttpDouble };
  };

  it("fetches translation from WordReference", function() {
    var xmlHttp = { open: true, send: true, responseText: "" };
    stubXMLHttp(xmlHttp);
    var options = {
      to: "en",
      from: "it",
      term: "malandrina"
    }
    var dictionary = options.from + options.to;
    var url = "http://api.wordreference.com/0.8/api-key/json/" + dictionary + "/" + options.term;

    wordReference.translate(options);

    expect(xmlHttp.open).toHaveBeenCalledWith("GET", url, false);
    expect(xmlHttp.send).toHaveBeenCalledWith(null);
  });

  it("returns translation", function() {
    var result;
    var responseText = "foo";
    var xmlHttp = { open: true, send: true, responseText: responseText };
    stubXMLHttp(xmlHttp);
    var options = {
      to: "en",
      from: "it",
      term: "malandrina"
    }
    var dictionary = options.from + options.to;

    result = wordReference.translate(options);

    expect(result).toEqual(responseText);
  });
});
