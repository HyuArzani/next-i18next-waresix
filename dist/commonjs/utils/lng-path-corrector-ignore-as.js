"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _url = require("url");

var _subpathIsRequired = _interopRequireDefault(require("./subpath-is-required"));

var _subpathFromLng = _interopRequireDefault(require("./subpath-from-lng"));

var parseAs = function parseAs(originalAs, href) {
  var asType = (0, _typeof2["default"])(originalAs);
  var as;

  if (asType === 'undefined') {
    return (0, _url.format)(href, {
      unicode: true
    });
  } else if (asType === 'string') {
    as = originalAs;
  } else {
    throw new Error("'as' type must be 'string', but it is ".concat(asType));
  }

  return as;
};

var _default = function _default(config, currentRoute, currentLanguage) {
  var allLanguages = config.allLanguages,
      localeSubpaths = config.localeSubpaths;
  var originalAs = currentRoute.as,
      originalHref = currentRoute.href;

  if (!allLanguages.includes(currentLanguage)) {
    throw new Error('Invalid configuration: Current language is not included in all languages array');
  }

  var href = originalHref;
  var as = parseAs(originalAs, href);
  /*
    url.format prefers the 'url.search' string over
    the 'url.query' object, so remove the search
    string to ensure the query object is used.
  */
  // delete href.search

  /*
    Strip any/all subpaths from the `as` value
  */

  /* Object.values(localeSubpaths).forEach((subpath) => {
    if (subpathIsPresent(as, subpath)) {
      as = removeSubpath(as, subpath)
    }
  }) */

  if ((0, _subpathIsRequired["default"])(config, currentLanguage)) {
    var basePath = "".concat(href.protocol, "//").concat(href.host);
    var currentAs = as.replace(basePath, '');
    var subpath = (0, _subpathFromLng["default"])(config, currentLanguage);
    href = "/".concat(subpath).concat(currentAs).replace(/\/$/, ''); // href.query.lng = currentLanguage
    // href.query.subpath = subpath
  }

  return {
    as: originalAs,
    href: href
  };
};

exports["default"] = _default;