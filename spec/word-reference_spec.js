var wordReference = require("../word-reference");
process.env.WORDREFERENCE_API_KEY = "api-key";

describe(".baseUrl", function() {
  it("returns the base URL for the WordReference API", function() {
    expect(wordReference.baseUrl).toEqual("http://api.wordreference.com/0.8");
  });
});

describe(".url", function() {
  it("returns a URL with the correct options", function() {
    var from = "it";
    var to = "en";
    var term = "malandrina";
    var expectedUrl = "http://api.wordreference.com/0.8/api-key/json/iten/malandrina";

    var url = wordReference.url({ from: from, to: to, term: term });

    expect(url).toEqual(expectedUrl);
  });
});

describe(".getTranslations", function() {
  describe("when request succeeds", function() {
    it("returns translations", function(done) {
      var result = { foo: "bar" };
      var httpClient = {
        get: function(url, callback) {
          callback(null, { statusCode: 200 }, JSON.stringify(result));
        }
      };
      wordReference.httpClient = httpClient;
      var options = { to: "en", from: "it", term: "malandrina" };

      var translationsPromise = wordReference.getTranslations(options);

      translationsPromise.done(function(translations) {
        expect(translations).toEqual(result);
        done();
      });
    });
  });

  describe("when request fails", function() {
    it("returns status code", function(done) {
      var options = { to: "en", from: "it", term: "malandrina" };
      var dictionary = options.from + options.to;
      var statusCode = 500;
      var httpClient = {
        get: function(url, callback) {
          callback(null, { statusCode: statusCode, error: "Internal Server Error" }, "");
        }
      };
      wordReference.httpClient = httpClient;
      var options = { to: "en", from: "it", term: "malandrina" };

      var translationsPromise = wordReference.getTranslations(options);

      translationsPromise.catch(function(response) {
        expect(response.statusCode).toEqual(statusCode);
        done();
      });
    });

    it("returns errors", function(done) {
      var options = { to: "en", from: "it", term: "malandrina" };
      var dictionary = options.from + options.to;
      var expectedError = "Internal Server Error";
      var httpClient = {
        get: function(url, callback) {
          callback(null, { statusCode: 500, error: expectedError }, "");
        }
      };
      wordReference.httpClient = httpClient;
      var options = { to: "en", from: "it", term: "malandrina" };

      var translationsPromise = wordReference.getTranslations(options);

      translationsPromise.catch(function(response) {
        expect(response.errors).toEqual([expectedError]);
        done();
      });
    });
  });
});
