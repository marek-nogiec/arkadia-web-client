'use strict';
var Convert = require('ansi-to-html');
var convert = new Convert();

var lineIsEmpty = function (line) {
  return line.replace(/\r\n|\n/, '').trim() === ''
};

var leftTrimEmptyLines = function (lines) {
  var i = 0;
  while (lineIsEmpty(lines[i])) {
    i++;
  }
  return lines.slice(i);
};

var lastCharIsBreak = function (line) {
  return /\<br\/\>$/.test(line);
};

var isEmpty = function (line) {
  return line === '';
};

var isPrompt = function (line) {
  return line === '>';
};

var lineShouldBeRemoved = function (line) {
  line = line.trim();
  return isEmpty(line) || isPrompt(line);
};

var preserveIndent = function (line, numberOfSpaces) {
  return line.replace(/^( +)/, generateSpaces(numberOfSpaces))
};

var generateSpaces = function (i) {
  return new Array(i + 1).join('&nbsp;');
};

var MudResponse = function (txt) {
  this.rawResponse = txt;
  this.parseText();
};

MudResponse.prototype.parseText = function () {
  var lines = this.rawResponse.split(/\r|\r\n/);

  lines = leftTrimEmptyLines(lines);

  lines = lines
    .filter(function(line) {
      return !lineShouldBeRemoved(line);
    })
    .map(function (line) {
      var startingSpaces = line.match(/^( +)/);
      if (startingSpaces) {
        var numberOfSpaces = startingSpaces[1].length;
        line = preserveIndent(line, numberOfSpaces);
      }

      if (lastCharIsBreak(line))
        return line.slice(0,-5);

      return line;
    });

  var text = lines.join('<br/>');

  this.responseText = convert.toHtml(text);
};

MudResponse.prototype.getResponseText = function () {
  return this.responseText;
}

module.exports = MudResponse;