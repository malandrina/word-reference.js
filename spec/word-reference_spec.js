var wordReference = require("../word-reference");

describe(".baseUrl", function() {
  it("returns the base URL for the WordReference API", function() {
    expect(wordReference.baseUrl).toEqual("http://api.wordreference.com/0.8");
  });
});

describe(".translate", function() {
  var responseBody = '{ "foo": "bar" }';
  var stubHttp = function() {
    response = {
      on: function(eventName, callback) {
            callback(responseBody);
          }

    };
    http = {
      get: function(url, callback) {
        callback(response);
      }
    }
  };

  var stubSuccessfulRequest = function() {
    stubHttp();
    spyOn(http, "get").and.callThrough();
  };

  describe("when request succeeds", function() {
    it("returns translations from WordReference API", function() {
      var options = { to: "en", from: "it", term: "malandrina" };
      var dictionary = options.from + options.to;
      var handleResponse = function(requestResponse) {
        result = requestResponse;
      };
      stubSuccessfulRequest();

      wordReference.translate(options).then(function(translations) {
        expect(translations).toEqual(JSON.parse(responseBody));
      });
    });
  });
});
