"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(config, language) {
  return typeof config.localeSubpaths[language] === 'string';
};

exports["default"] = _default;