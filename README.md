word-reference.js
-------------------

An unpublished Node.js module for facilitating server-side interactions with the
[WordReference JSON API](http://www.wordreference.com/docs/api.aspx). Not under
active development.

### Usage

```
var wordReference = require("./word-reference");
var options = { from: "it", to: "en", term: "malandrina" };
var result;
wordReference.getTranslations(options).then(function(translations) {
  result = translations;
});
```

### Running tests

```
$ make test
```
