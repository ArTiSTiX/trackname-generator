// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../lib/utils.js":[function(require,module,exports) {
function titleCaseWord(word) {
  return "".concat(word.substring(0, 1).toUpperCase()).concat(word.substring(1));
}

function getTotalWeight(words) {
  return words.reduce(function (sum, word) {
    return sum + word.weight;
  }, 0.0);
}

function weightedRandom(words) {
  var total = getTotalWeight(words);
  var selection = Math.random() * total;
  var sum = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = words[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var word = _step.value;

      if (selection >= sum && selection < sum + word.weight) {
        return word;
      }

      sum += word.weight;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

var id = 0;

function uuid() {
  return id++;
}

module.exports.titleCaseWord = titleCaseWord;
module.exports.weightedRandom = weightedRandom;
module.exports.uuid = uuid;
},{}],"../lib/dictionary.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('./utils'),
    weightedRandom = _require.weightedRandom;

var Dictionary =
/*#__PURE__*/
function () {
  function Dictionary(words) {
    _classCallCheck(this, Dictionary);

    this.words = words;
  }

  _createClass(Dictionary, [{
    key: "filter",
    value: function filter(tags) {
      var excluded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var possibles = this.words.filter(function (word) {
        return word.is(tags);
      });
      var withoutExcluded = possibles.filter(function (word) {
        return !excluded.includes(word.number);
      }); // Ensure exlusions does not reduce to no possibles

      if (withoutExcluded.length) return withoutExcluded;
      return possibles;
    }
  }, {
    key: "choose",
    value: function choose(tags) {
      var excluded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var possibles = this.filter(tags, excluded);

      if (!possibles.length) {
        throw new Error("cannot find any words for ".concat(tags));
      }

      return weightedRandom(possibles);
    }
  }]);

  return Dictionary;
}();

module.exports = Dictionary;
},{"./utils":"../lib/utils.js"}],"../lib/word.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('./utils'),
    uuid = _require.uuid;

var Word =
/*#__PURE__*/
function () {
  function Word(text, tags, weight, number) {
    _classCallCheck(this, Word);

    this.text = text || '';
    this.tags = tags;
    this.weight = weight || 1;
    this.number = number || uuid();
  }

  _createClass(Word, [{
    key: "is",
    value: function is(tags) {
      var _this = this;

      return tags.every(function (tag) {
        return _this.tags.includes(tag);
      });
    }
  }, {
    key: "generate",
    value: function generate(tags) {
      var parts = this.text.split(':');

      if (tags.includes('NOU')) {
        if (tags.includes('SNG')) {
          return parts[0];
        }

        if (tags.includes('PLU')) {
          return parts[1];
        }

        return parts[0];
      }

      if (tags.includes('VRB')) {
        if (tags.includes('SNG')) {
          return parts[1];
        }

        if (tags.includes('PST')) {
          return parts[2];
        }

        if (tags.includes('PSP')) {
          return parts[3];
        }

        if (tags.includes('ING')) {
          return parts[4];
        }

        return parts[0];
      }

      return this.text;
    }
  }], [{
    key: "parseLine",
    value: function parseLine(line, lineNb) {
      if (!line || line.startsWith('#')) return null;

      var _line$replace$split = line.replace('\\,', '%COMMA').split(','),
          _line$replace$split2 = _slicedToArray(_line$replace$split, 3),
          lineTags = _line$replace$split2[0],
          lineText = _line$replace$split2[1],
          weightStr = _line$replace$split2[2];

      var tags = lineTags.trim().split('-');
      var text = lineText.trim().replace('%COMMA', ',');
      var weight = Number(weightStr) || 1;
      var number = lineNb;
      return new Word(text, tags, weight, number);
    }
  }]);

  return Word;
}();

module.exports = Word;
},{"./utils":"../lib/utils.js"}],"../lib/sentence.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('./utils'),
    titleCaseWord = _require.titleCaseWord;

var Sentence =
/*#__PURE__*/
function () {
  function Sentence(dictionary) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Sentence);

    this.dictionary = dictionary;
    this.options = options || {};
  }

  _createClass(Sentence, [{
    key: "generate",
    value: function generate() {
      var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '%TPL';
      var prevChosen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var parts = template.split(' ');
      var rets = [];
      var chosen = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var part = _step.value;

          if (part.startsWith('%')) {
            var tags = part.substring(1).split('-');
            var word = this.dictionary.choose(tags, [].concat(_toConsumableArray(prevChosen), chosen));
            var str = word.generate(tags);
            chosen.push(word.number);
            rets.push(str);
          } else {
            rets.push(part);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var sentence = rets.join(' ').replace(/\s+/g, ' ');

      if (this.options.debug) {
        console.debug(template, '\n  ->', sentence, "(chosen: ".concat(chosen.join(','), ")"));
      }

      if (sentence.includes('%')) {
        var excluded = this.options.excludes ? [].concat(_toConsumableArray(prevChosen), chosen) : [];
        return this.generate(sentence, excluded);
      }

      return this.reformat(sentence);
    }
  }, {
    key: "reformat",
    value: function reformat(text) {
      var lowercasedWords = this.dictionary.filter(['LOWERCASE']).map(function (w) {
        return w.text;
      });
      return titleCaseWord(text.trim().replace(/(^| )a ([aeiou])/g, '$1an $2').replace(/s 's /g, 's\' ').replace(/ 's /g, '\'s ').replace(/ , /g, ', ').replace(/ are not /g, ' ain\'t ').replace(/ is not /g, ' ain\'t ').replace(/ will not /g, ' won\'t ').replace(/ was not /g, ' wasn\'t ').replace(/ were not /g, ' weren\'t ').replace(/ do not /g, ' don\'t ').replace(/ does not /g, ' doesn\'t ').split(' ').map(function (word) {
        return lowercasedWords.includes(word) ? word : titleCaseWord(word);
      }).join(' '));
    }
  }]);

  return Sentence;
}();

module.exports = Sentence;
},{"./utils":"../lib/utils.js"}],"../lib/index.js":[function(require,module,exports) {
var Dictionary = require('./dictionary');

var Word = require('./word');

var Sentence = require('./sentence');

module.exports.Dictionary = Dictionary;
module.exports.Word = Word;
module.exports.Sentence = Sentence;
},{"./dictionary":"../lib/dictionary.js","./word":"../lib/word.js","./sentence":"../lib/sentence.js"}],"../dictionaries/postrock.txt":[function(require,module,exports) {
module.exports = "TPL,%TPL ? %TPL !,0.1\nTPL,%TPL because of %NPH\n\nTPL,%APH\nTPL,%NPH,5\n\nTPL,%APH and %APH\nTPL,%APH but not %APH\nTPL,%NPH and %NPH\nTPL,%NPH, %NPH and %NPH\nTPL,as %APH as %NPH\n\nTPL,%VRB-ACT-TRS-INF %ADV-PRE %NPH,2\nTPL,%VRB-ACT-TRS-PST %ADV-PRE %NPH,2\nTPL,%VRB-OBJ-INF %ADV-PRE %NPH,2\nTPL,%VRB-OBJ-PST %ADV-PRE %NPH,2\n\nTPL,%NPH-SNG %VPH-SNG,10\nTPL,%NPH-PLU %VPH-PLU,10\n\nTPL,%APH like %NPH\nTPL,like %NPH %ADV-PRE %NPH\nTPL,%APH %ADV-PRE %NPH\n\nTPL,when %NPH-SNG %VPH-SNG\nTPL,when %NPH-PLU %VPH-PLU\n\nTPL,%?AVM %VRB-PSP by %NPH\n\nTPL,%NPH-SNG that %VPH-SNG\nTPL,%NPH-PLU that %VPH-PLU\nTPL,%VRB-OBJ-ING %ADV-PRE %NPH\n\nTPL,%NPH-SNG %VPH-SNG\nTPL,%NPH-PLU %VPH-SNG\n\nTPL,%ADV-PRE %NPH\nTPL,%NPH %ADV-PRE %NPH\n\n\n?APH,%APH,5\n?APH,%APH %ADJ\n?APH,,10\n?APH,,10\n?NOT,not\n?NOT,,10\n?AVM,%AVM\n?AVM,,10\n?AVC,%AVC\n?AVC,,10\n\n?DONT-SNG,does not\n?DONT-SNG,,10\n?DONT-PLU,do not\n?DONT-PLU,,10\n\nNPH-SNG,%?APH %NOU-NCT,3\nNPH-SNG,%?APH %NOU-NCT of %NPH-NOF\nNPH-SNG,%DET-SNG %?APH %NOU-CNT-SNG of %NPH-NOF\nNPH-SNG-UND,%DET-SNG-UND %?APH %NOU-CNT-SNG of %NPH-NOF\n\nNPH-SNG-NOF,%DET-SNG %?APH %NOU-CNT-SNG,10\nNPH-SNG-NOF-UND,%DET-SNG-UND %?APH %NOU-CNT-SNG,5\n\nNPH-PLU,%?APH %NOU-CNT-PLU of %NPH-NOF\nNPH-PLU-NOF,%DET-PLU %?APH %NOU-CNT-PLU,10\nNPH-PLU-NOF-UND,%?APH %NOU-CNT-PLU,5\n\nNPH-SNG,%NOU-SNG 's %NOU-CNT-SNG,0.25\nNPH-SNG,%NOU-PLU 's %NOU-CNT-SNG,0.25\nNPH-PLU,%NOU-SNG 's %NOU-CNT-PLU,0.25\nNPH-PLU,%NOU-PLU 's %NOU-CNT-PLU,0.25\nNPH-SNG,%NPH-SNG %NOU-CNT-SNG,0.5\nNPH-SNG,%NPH-PLU %NOU-CNT-SNG,0.5\nNPH-PLU,%NPH-SNG %NOU-CNT-PLU,0.5\nNPH-PLU,%NPH-PLU %NOU-CNT-PLU,0.5\n\nVPH-SNG-PRS,is %?NOT %?AVM %APH\nVPH-SNG-PST,was %?NOT %?AVM %APH\nVPH-SNG-FUT,will %?NOT be %?AVM %APH\n\nVPH-SNG-PRS,%?AVM %VRB-ACT-NTR-SNG\nVPH-SNG-PST,%?AVM %VRB-ACT-NTR-PST\nVPH-SNG-PRS,%?AVM %VRB-ACT-TRS-SNG %NPH\nVPH-SNG-PST,%?AVM %VRB-ACT-TRS-PST %NPH\nVPH-SNG-PRS,%?AVM %VRB-OBJ-SNG %ADV-PRE %NPH\nVPH-SNG-PST,%?AVM %VRB-OBJ-SNG-PST %ADV-PRE %NPH\n\nVPH-PLU-PRS,are %?NOT %?AVM %APH\nVPH-PLU-PST,were %?NOT %?AVM %APH\nVPH-PLU-FUT,will %?NOT be %?AVM %APH\n\nVPH-PLU-PRS,%?AVM %VRB-ACT-NTR-PLU\nVPH-PLU-PST,%?AVM %VRB-ACT-NTR-PST\nVPH-PLU-PRS,%?AVM %VRB-ACT-TRS-PLU %NPH\nVPH-PLU-PST,%?AVM %VRB-ACT-TRS-PST %NPH\nVPH-PLU-PRS,%?AVM %VRB-OBJ-PLU %ADV-PRE %NPH\nVPH-PLU-PST,%?AVM %VRB-OBJ-PLU-PST %ADV-PRE %NPH\n\nVPH-SNG-PRS,%?DONT-SNG %VRB-STA-SNG\nVPH-SNG-PRS,%?DONT-PLU %VRB-STA-PLU\nVPH-PLU-PRS,%VRB-STA-PLU %?NOT %?AVM %APH\nVPH-PLU-PST,%VRB-STA-PLU-PST %?NOT %?AVM %APH\nVPH-SNG-PST,has %?NOT %VRB-STA-PSP\nVPH-PLU-PST,have %?NOT %VRB-STA-PSP\nVPH-SNG-PST,has %?NOT %VRB-ACT-PSP %ADV-PRE %NPH\nVPH-PLU-PST,have %?NOT %VRB-ACT-PSP %ADV-PRE %NPH\n\nVPH-SNG,%VPH-SNG-PRS %AVT-PRS\nVPH-SNG,%VPH-SNG-PST %AVT-PST\nVPH-SNG,%VPH-SNG-FUT %AVT-FUT\nVPH-PLU,%VPH-PLU-PRS %AVT-PRS\nVPH-PLU,%VPH-PLU-PST %AVT-PST\nVPH-PLU,%VPH-PLU-FUT %AVT-FUT\n\nAPH,%?AVC %ADJ,4\nAPH,%VRB-ACT-ING,2\nAPH,%VRB-TRS-PSP\nAPH,%VRB-NTR-PSP\n\nADJ,acid\nADJ,alive\nADJ,angry\nADJ,asleep\nADJ,beautiful\nADJ,brief\nADJ,brilliant\nADJ,calm\nADJ,cold\nADJ,conscious\nADJ,cruel\nADJ,dead\nADJ,deep\nADJ,different\nADJ,electric\nADJ,empty\nADJ,false\nADJ,first\nADJ,former\nADJ,fragile\nADJ,frozen\nADJ,giant\nADJ,golden\nADJ,guilty\nADJ,happy\nADJ,invisible\nADJ,innocent\nADJ,last\nADJ,little\nADJ,lonely\nADJ,long\nADJ,loud\nADJ,mad\nADJ,magic\nADJ,majestic\nADJ,new\nADJ,past\nADJ,poor\nADJ,precious\nADJ,pure\nADJ,quiet\nADJ,sad\nADJ,scared\nADJ,second\nADJ,secret\nADJ,shiny\nADJ,slow\nADJ,soft\nADJ,strange\nADJ,strong\nADJ,sweet\nADJ,timeless\nADJ,true\nADJ,unlikely\nADJ,warm\nADJ,wild\nADJ,wise\nADJ,wonderful\nADJ,wound up\nADJ,young\n\nADJ-CLR,blue\nADJ-CLR,green\nADJ-CLR,orange\nADJ-CLR,purple\nADJ-CLR,yellow\nADJ-CLR,pink\nADJ-CLR,red\nADJ-CLR,black\nADJ-CLR,white\n\nNOU-NCT,her\nNOU-NCT,mine\nNOU-NCT,home\nNOU-NCT,everything\nNOU-NCT,everyone\nNOU-NCT,everybody\nNOU-NCT,no one\nNOU-NCT,Death\nNOU-NCT,Heaven\nNOU-NCT,Avalon\nNOU-NCT,Oblivion\nNOU-NCT,nostalgia\nNOU-NCT,stillness\nNOU-NCT,loneliness\nNOU-NCT,sadness\nNOU-NCT,pleasure\nNOU-NCT,glory\nNOU-NCT,love\nNOU-NCT,blood\nNOU-NCT,pursuit\nNOU-NCT,innocence\nNOU-SNG-CNT,truth\nNOU-SNG-PLU-CNT-NCT,god:gods\nNOU-SNG-PLU-CNT,man:men\nNOU-SNG-PLU-CNT,mountain:mountains\nNOU-SNG-PLU-CNT,ocean:oceans\nNOU-SNG-PLU-CNT,sky:skies\nNOU-SNG-PLU-CNT-NCT,life:lives\nNOU-SNG-PLU-CNT,demon:demons\nNOU-SNG-PLU-CNT,cat:cats\nNOU-SNG-PLU-CNT,horse:horses\nNOU-SNG-PLU-CNT,flower:flowers\nNOU-SNG-PLU-CNT,tear:tears\nNOU-SNG-PLU-CNT,dream:dreams\nNOU-SNG-PLU-CNT,suicide:suicides\nNOU-SNG-PLU-CNT,shadow:shadows\nNOU-SNG-PLU-CNT,snow:snows\nNOU-SNG-PLU-CNT,shade:shades\nNOU-SNG-PLU-CNT,color:colors\nNOU-SNG-PLU-CNT,day:days\nNOU-SNG-PLU-CNT-NCT,time:times\nNOU-SNG-PLU-CNT,light:lights\nNOU-SNG-PLU-CNT,sun:suns\nNOU-SNG-PLU-CNT,moon:moons\nNOU-SNG-PLU-CNT,moonlight:moonlights\nNOU-SNG-PLU-CNT-NCT,memory:memories\nNOU-SNG-PLU-CNT,ghost:ghosts\nNOU-SNG-PLU-CNT,path:paths\nNOU-SNG-PLU-CNT,way:ways\nNOU-SNG-PLU-CNT,octopus:octopuses\nNOU-SNG-PLU-CNT,childhood:childhoods\nNOU-SNG-PLU-CNT-NCT,regret:regrets\nNOU-SNG-PLU-CNT,fairytale:fairytales\nNOU-SNG-PLU-CNT,journey:journeys\nNOU-SNG-PLU-CNT,land:lands\nNOU-SNG-PLU-CNT,bound:bounds\nNOU-SNG-PLU-CNT,world:worlds\nNOU-SNG-PLU-CNT,water:waters\nNOU-SNG-PLU-CNT,cave:caves\nNOU-SNG-PLU-CNT,star:stars\nNOU-SNG-PLU-CNT,river:rivers\nNOU-SNG-PLU-CNT,sea:seas\nNOU-SNG-PLU-CNT,season:seasons\nNOU-SNG-PLU-CNT,forest:forests\nNOU-SNG-PLU-CNT,wave:waves\nNOU-SNG-PLU-CNT,night:nights\nNOU-SNG-PLU-CNT,flame:flames\nNOU-SNG-PLU-CNT-NCT,fire:fires\nNOU-SNG-PLU-CNT,wind:winds\nNOU-SNG-PLU-CNT,place:places\nNOU-SNG-PLU-CNT-NCT,remorse:remorses\nNOU-SNG-PLU-CNT,girl:girls\nNOU-SNG-PLU-CNT-NCT,noise:noises\nNOU-SNG-PLU-CNT,horizon:horizons\nNOU-SNG-PLU-CNT-NCT,dawn:dawns\nNOU-SNG-PLU-CNT-NCT,sunrise:sunrises\nNOU-SNG-PLU-CNT,lie:lies\nNOU-SNG-PLU-CNT-NCT,danger:dangers\nNOU-SNG-PLU-CNT-NCT,bird:birds\nNOU-SNG-PLU-CNT-NCT,wolf:wolves\n\nVRB-ACT-STA-NTR-SNG-PLU-PST-INF-ING,sleep:sleeps:slept:slept:sleeping\nVRB-ACT-STA-NTR-SNG-PLU-PST-PSP-INF-ING,scream:screams:screamed:screamed:screaming\nVRB-ACT-STA-NTR-SNG-PLU-PST-PSP-INF-ING,dream:dreams:dreamed:dreamed:dreaming\nVRB-ACT-STA-NTR-SNG-PLU-PST-INF-ING,talk:talks:talked:talked:talking\nVRB-ACT-STA-NTR-SNG-PLU-PST-PSP-INF-ING,speak:speaks:spoke:spoken:speaking\nVRB-ACT-STA-NTR-SNG-PLU-PST-INF-ING,run:runs:runned:runned:running\nVRB-ACT-STA-NTR-SNG-PLU-PST-PSP-INF-ING,cry:cries:cried:cried:crying\nVRB-ACT-STA-NTR-SNG-PLU-PST-PSP-INF-ING,fall:falls:fell:fallen:falling\nVRB-ACT-STA-NTR-SNG-PLU-PST-PSP-INF-ING,die:dies:died:dead:dying\nVRB-ACT-STA-NTR-SNG-PLU-PST-PSP-INF-ING,believe:believes:believed:believed:believing\nVRB-ACT-STA-NTR-SNG-PLU-PST-PSP-INF-ING,stand:stands:stood:stood:standing\n\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,hunt:hunts:hunted:hunted:hunting\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,hear:hears:heard:heard:hearing\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,haunt:haunts:haunted:haunted:haunting\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,leave:leaves:left:left:leaving\nVRB-ACT-STA-TRS-SNG-PLU-PST-PSP-INF-ING,fear:fears:feared:feared:fearing\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,lose:loses:lost:lost:losing\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,shift:shifts:shifted:shifted:shifting\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,shoot:shoots:shot:shot:shooting\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,ruin:ruins:ruined:ruined:ruining\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,tell:tells:told:told:telling\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,want:wants:wanted:wanted:wanting\nVRB-ACT-STA-TRS-SNG-PLU-PST-PSP-INF-ING,know:knows:known:known:knowing\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,find:finds:found:found:finding\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,give:gives:gave:given:giving\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,want:wants:wanted:wanted:wanting\nVRB-ACT-STA-TRS-SNG-PLU-PST-PSP-INF-ING,love:loves:loved:loved:loving\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,believe in:believes in:believed in:believed in:believing in\nVRB-ACT-STA-TRS-SNG-PLU-PST-PSP-INF-ING,watch:watches:watched:watched:watching\nVRB-ACT-TRS-SNG-PLU-PST-PSP-INF-ING,follow:follows:followed:followed:following\nVRB-ACT-STA-TRS-SNG-PLU-PST-PSP-INF-ING,see:sees:saw:seen:seeing\nVRB-ACT-STA-TRS-SNG-PLU-PST-PSP-INF-ING,remember:remembers:remembered:remembered:remembering\n\nVRB-OBJ-SNG-PLU-PST-INF-ING,scream:screams:screamed:screamed:screaming\nVRB-OBJ-SNG-PLU-PST-INF-ING,shout:shouts:shouted:shouted:shouting\nVRB-OBJ-SNG-PLU-PST-INF-ING,look:looks:looked:looked:looking\nVRB-OBJ-ACT-SNG-PLU-PST-PSP-INF-ING,walk:walks:walked:walked:walking\n\nAVC,fully\nAVC,almost\nAVC,too\nAVC,very\nAVC,pretty\n\nAVW,here\nAVW,abroad\nAVW,nearby\n\nADV-PRE-WHR,towards\nADV-PRE-WHR,inside\nADV-PRE-WHR,far from\nADV-PRE-WHR,above\nADV-PRE-WHR,below\nADV-PRE-WHR,behind\nADV-PRE-WHR,beyond\nADV-PRE-WHR,away from\nADV-PRE-WHR,outside\nADV-PRE-WHR,in\nADV-PRE-WHR,into\nADV-PRE-WHR,out of\nADV-PRE-WHR,at\nADV-PRE-WHR,across\nADV-PRE-WHR,between\nADV-PRE-WHR,next to\nADV-PRE-WHR,in front of\nADV-PRE-WHR,against\nADV-PRE-WHR,along\nADV-PRE-WHR,by\nADV-PRE-WHR,around\nADV-PRE-WHR,all around\n\nADV-PRE-TIM,before\nADV-PRE-TIM,after\nADV-PRE-TIM,since\nADV-PRE-TIM,till\nADV-PRE-TIM,until\nADV-PRE-TIM,following\n\nADV-PRE,for\nADV-PRE,about\nADV-PRE,with\nADV-PRE,without\nADV-PRE,like\n\nAVM,secretly\nAVM,fast\nAVM,well\nAVM,quickly\nAVM,easily\nAVM,slowly\nAVM,lowly\nAVM,badly\nAVM,carefully\nAVM,quietly\nAVM,beautifully\nAVM,deeply\nAVM,deadly\n\nAVF,never\nAVF,sometimes\nAVF,often\nAVF,rarely\nAVF,always\n\nAVT-PRS,today\nAVT-PRS,now\nAVT-FUT,tomorrow\nAVT-FUT,later\nAVT-FUT,soon\nAVT-PST,yesterday\nAVT-PST,already\nAVT-PRS-FUT-PST,tonight\nAVT-PRS-FUT-PST,then\n\nDET-SNG-UND,a,5\nDET-SNG-UND,a single\nDET-SNG-UND,a patch of\nDET-SNG,another\nDET-SNG,this\nDET-SNG,that\nDET-SNG,each\nDET-SNG,every\nDET-SNG-PLU,the,5\nDET-SNG-PLU,your\nDET-SNG-PLU,my\nDET-SNG-PLU,his\nDET-SNG-PLU,her\nDET-SNG-PLU,their\nDET-PLU,these\nDET-PLU,those\nDET-PLU,many\nDET-PLU,some\nDET-PLU,most\nDET-PLU,few\nDET-PLU,a few\n\nDET-PLU,all the\nDET-PLU,a couple of\n\nDET-PLU,no\n\nDET-SNG,one\nDET-PLU,two\nDET-PLU,four\nDET-PLU,seven\nDET-PLU,thirteen\nDET-PLU,tons of\nDET-PLU,a thousand\nDET-PLU,millions of\n\n#AVW,there\n#AVW,back\n#AVW,anywhere\n#AVC,just\n\nLOWERCASE,in\nLOWERCASE,on\nLOWERCASE,of\nLOWERCASE,the\nLOWERCASE,a\nLOWERCASE,an\nLOWERCASE,and\n"
},{}],"../node_modules/whatwg-fetch/fetch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.fetch = fetch;
exports.DOMException = void 0;
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob: 'FileReader' in self && 'Blob' in self && function () {
    try {
      new Blob();
      return true;
    } catch (e) {
      return false;
    }
  }(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
};

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj);
}

if (support.arrayBuffer) {
  var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

  var isArrayBufferView = ArrayBuffer.isView || function (obj) {
    return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
  };
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name);
  }

  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name');
  }

  return name.toLowerCase();
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value);
  }

  return value;
} // Build a destructive iterator for the value list


function iteratorFor(items) {
  var iterator = {
    next: function () {
      var value = items.shift();
      return {
        done: value === undefined,
        value: value
      };
    }
  };

  if (support.iterable) {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}

function Headers(headers) {
  this.map = {};

  if (headers instanceof Headers) {
    headers.forEach(function (value, name) {
      this.append(name, value);
    }, this);
  } else if (Array.isArray(headers)) {
    headers.forEach(function (header) {
      this.append(header[0], header[1]);
    }, this);
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function (name) {
      this.append(name, headers[name]);
    }, this);
  }
}

Headers.prototype.append = function (name, value) {
  name = normalizeName(name);
  value = normalizeValue(value);
  var oldValue = this.map[name];
  this.map[name] = oldValue ? oldValue + ', ' + value : value;
};

Headers.prototype['delete'] = function (name) {
  delete this.map[normalizeName(name)];
};

Headers.prototype.get = function (name) {
  name = normalizeName(name);
  return this.has(name) ? this.map[name] : null;
};

Headers.prototype.has = function (name) {
  return this.map.hasOwnProperty(normalizeName(name));
};

Headers.prototype.set = function (name, value) {
  this.map[normalizeName(name)] = normalizeValue(value);
};

Headers.prototype.forEach = function (callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this);
    }
  }
};

Headers.prototype.keys = function () {
  var items = [];
  this.forEach(function (value, name) {
    items.push(name);
  });
  return iteratorFor(items);
};

Headers.prototype.values = function () {
  var items = [];
  this.forEach(function (value) {
    items.push(value);
  });
  return iteratorFor(items);
};

Headers.prototype.entries = function () {
  var items = [];
  this.forEach(function (value, name) {
    items.push([name, value]);
  });
  return iteratorFor(items);
};

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'));
  }

  body.bodyUsed = true;
}

function fileReaderReady(reader) {
  return new Promise(function (resolve, reject) {
    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function () {
      reject(reader.error);
    };
  });
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsArrayBuffer(blob);
  return promise;
}

function readBlobAsText(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsText(blob);
  return promise;
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf);
  var chars = new Array(view.length);

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i]);
  }

  return chars.join('');
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0);
  } else {
    var view = new Uint8Array(buf.byteLength);
    view.set(new Uint8Array(buf));
    return view.buffer;
  }
}

function Body() {
  this.bodyUsed = false;

  this._initBody = function (body) {
    this._bodyInit = body;

    if (!body) {
      this._bodyText = '';
    } else if (typeof body === 'string') {
      this._bodyText = body;
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body;
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body;
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString();
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

      this._bodyInit = new Blob([this._bodyArrayBuffer]);
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body);
    } else {
      this._bodyText = body = Object.prototype.toString.call(body);
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8');
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type);
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
      }
    }
  };

  if (support.blob) {
    this.blob = function () {
      var rejected = consumed(this);

      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob');
      } else {
        return Promise.resolve(new Blob([this._bodyText]));
      }
    };

    this.arrayBuffer = function () {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
      } else {
        return this.blob().then(readBlobAsArrayBuffer);
      }
    };
  }

  this.text = function () {
    var rejected = consumed(this);

    if (rejected) {
      return rejected;
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob);
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text');
    } else {
      return Promise.resolve(this._bodyText);
    }
  };

  if (support.formData) {
    this.formData = function () {
      return this.text().then(decode);
    };
  }

  this.json = function () {
    return this.text().then(JSON.parse);
  };

  return this;
} // HTTP methods whose capitalization should be normalized


var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

function normalizeMethod(method) {
  var upcased = method.toUpperCase();
  return methods.indexOf(upcased) > -1 ? upcased : method;
}

function Request(input, options) {
  options = options || {};
  var body = options.body;

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read');
    }

    this.url = input.url;
    this.credentials = input.credentials;

    if (!options.headers) {
      this.headers = new Headers(input.headers);
    }

    this.method = input.method;
    this.mode = input.mode;
    this.signal = input.signal;

    if (!body && input._bodyInit != null) {
      body = input._bodyInit;
      input.bodyUsed = true;
    }
  } else {
    this.url = String(input);
  }

  this.credentials = options.credentials || this.credentials || 'same-origin';

  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers);
  }

  this.method = normalizeMethod(options.method || this.method || 'GET');
  this.mode = options.mode || this.mode || null;
  this.signal = options.signal || this.signal;
  this.referrer = null;

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests');
  }

  this._initBody(body);
}

Request.prototype.clone = function () {
  return new Request(this, {
    body: this._bodyInit
  });
};

function decode(body) {
  var form = new FormData();
  body.trim().split('&').forEach(function (bytes) {
    if (bytes) {
      var split = bytes.split('=');
      var name = split.shift().replace(/\+/g, ' ');
      var value = split.join('=').replace(/\+/g, ' ');
      form.append(decodeURIComponent(name), decodeURIComponent(value));
    }
  });
  return form;
}

function parseHeaders(rawHeaders) {
  var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2

  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
    var parts = line.split(':');
    var key = parts.shift().trim();

    if (key) {
      var value = parts.join(':').trim();
      headers.append(key, value);
    }
  });
  return headers;
}

Body.call(Request.prototype);

function Response(bodyInit, options) {
  if (!options) {
    options = {};
  }

  this.type = 'default';
  this.status = options.status === undefined ? 200 : options.status;
  this.ok = this.status >= 200 && this.status < 300;
  this.statusText = 'statusText' in options ? options.statusText : 'OK';
  this.headers = new Headers(options.headers);
  this.url = options.url || '';

  this._initBody(bodyInit);
}

Body.call(Response.prototype);

Response.prototype.clone = function () {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  });
};

Response.error = function () {
  var response = new Response(null, {
    status: 0,
    statusText: ''
  });
  response.type = 'error';
  return response;
};

var redirectStatuses = [301, 302, 303, 307, 308];

Response.redirect = function (url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code');
  }

  return new Response(null, {
    status: status,
    headers: {
      location: url
    }
  });
};

var DOMException = self.DOMException;
exports.DOMException = DOMException;

try {
  new DOMException();
} catch (err) {
  exports.DOMException = DOMException = function (message, name) {
    this.message = message;
    this.name = name;
    var error = Error(message);
    this.stack = error.stack;
  };

  DOMException.prototype = Object.create(Error.prototype);
  DOMException.prototype.constructor = DOMException;
}

function fetch(input, init) {
  return new Promise(function (resolve, reject) {
    var request = new Request(input, init);

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'));
    }

    var xhr = new XMLHttpRequest();

    function abortXhr() {
      xhr.abort();
    }

    xhr.onload = function () {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      };
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
      var body = 'response' in xhr ? xhr.response : xhr.responseText;
      resolve(new Response(body, options));
    };

    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };

    xhr.ontimeout = function () {
      reject(new TypeError('Network request failed'));
    };

    xhr.onabort = function () {
      reject(new DOMException('Aborted', 'AbortError'));
    };

    xhr.open(request.method, request.url, true);

    if (request.credentials === 'include') {
      xhr.withCredentials = true;
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false;
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob';
    }

    request.headers.forEach(function (value, name) {
      xhr.setRequestHeader(name, value);
    });

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr);

      xhr.onreadystatechange = function () {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr);
        }
      };
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
  });
}

fetch.polyfill = true;

if (!self.fetch) {
  self.fetch = fetch;
  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;
}
},{}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"index.js":[function(require,module,exports) {
var process = require("process");
"use strict";

require("./styles.css");

var _lib = require("../lib");

var _postrock = _interopRequireDefault(require("../dictionaries/postrock.txt"));

var _whatwgFetch = require("whatwg-fetch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!window.fetch) {
  (0, _whatwgFetch.fetch)();
}

var loadDictionary = function loadDictionary() {
  try {
    var data = _postrock.default;
    var lines = data.split(/\r?\n/);
    words = lines.map(function (line, index) {
      return _lib.Word.parseLine(line, index);
    }).filter(Boolean);
  } catch (err) {
    console.error("Dictionary ".concat(dictName, " does not exists"));
    process.exit(1);
  }

  var dict = new _lib.Dictionary(words);
  var sentence = new _lib.Sentence(dict, {
    debug: true,
    excludes: false
  });
  return sentence;
};

var loadBackgroundImage = function loadBackgroundImage() {
  window.fetch('https://www.reddit.com/r/EarthPorn/random.json').then(function (response) {
    return response.json();
  }).then(function (redditPost) {
    console.log(redditPost[0].data.children[0].data);
    var redditImage = redditPost[0].data.children[0].data.url;
    var redditPermalink = redditPost[0].data.children[0].data.permalink;
    var redditTitle = redditPost[0].data.children[0].data.title;
    var redditAuthor = redditPost[0].data.children[0].data.author;
    var $background = document.getElementById('background');
    $background.style.backgroundImage = "url(\"".concat(redditImage, "\")");
    var $redditLink = document.getElementById('redditLink');
    $redditLink.innerHTML = redditTitle;
    $redditLink.href = "https://reddit.com".concat(redditPermalink);
    var $redditAuthor = document.getElementById('redditAuthor');
    $redditAuthor.innerHTML = "/u/".concat(redditAuthor);
    $redditAuthor.href = "https://reddit.com/u/".concat(redditAuthor);
    var $redditContainer = document.getElementById('reddit');
    var img = new Image();

    img.onload = function () {
      $background.classList.add('loaded');
      $redditContainer.classList.add('loaded');
    };

    img.src = redditImage;
  });
};

var sentence = loadDictionary('postrock');
window.addEventListener('DOMContentLoaded', function () {
  var $trackNameContainer = document.getElementById('trackName');
  $trackNameContainer.innerHTML = sentence.generate();
  loadBackgroundImage();
});
},{"./styles.css":"styles.css","../lib":"../lib/index.js","../dictionaries/postrock.txt":"../dictionaries/postrock.txt","whatwg-fetch":"../node_modules/whatwg-fetch/fetch.js","process":"../node_modules/process/browser.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56849" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/demo.e31bb0bc.js.map