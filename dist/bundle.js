(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var isDefined = function isDefined(a) {
  return typeof a !== 'undefined';
};

// from https://github.com/npm-dom/is-dom/blob/master/index.js
function isNode(val) {
  if (!val || typeof val !== 'object') return false;
  if (window && 'object' == typeof window.Node) return val instanceof window.Node;
  return 'number' == typeof val.nodeType && 'string' == typeof val.nodeName;
}

// Convert computed styles to something we can iterate over
// adapted from http://stackoverflow.com/questions/754607/can-jquery-get-all-css-styles-associated-with-an-element/6416527#6416527
function convertComputedStyles(computed) {
  var styles = {};
  for (var i = 0, l = computed.length; i < l; i++) {
    var prop = computed[i];
    styles[prop] = computed.getPropertyValue(prop);
  }
  return styles;
}

/**
* Returns a collection of CSS property-value pairs
* @param  {element} node A DOM element
* @return {object} collection of CSS property-value pairs
* @api public
*/
function computedStyles(node) {
  if (!isNode(node)) {
    throw new Error('parameter 1 is not of type \'Element\'');
  }
  // adapted from https://github.com/angular/angular.js/issues/2866#issuecomment-31012434
  if (isDefined(node.currentStyle)) {
    //for old IE
    return node.currentStyle;
  } else if (isDefined(window.getComputedStyle)) {
    //for modern browsers
    return convertComputedStyles(node.ownerDocument.defaultView.getComputedStyle(node, null));
  }
  return node.style;
}

// Copies computed styles from source to target
/**
* Copies computed styles from source to target
* @param  {element} source A DOM element to copy styles from
* @param  {element} target A DOM element to copy styles to
* @param {(object|boolean)} [defaultStyles=true] collection of CSS property-value pairs, false: copy none, true: copy all
* @api public
*/
function copyStyles(source, target) {
  var defaultStyles = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  if (defaultStyles === false) {
    return;
  }

  var srcStyles = computedStyles(source);

  if (defaultStyles === true) {
    // copy all styles
    for (var key in srcStyles) {
      target.style[key] = srcStyles[key];
    }
    return;
  }

  var parStyles = computedStyles(target.parentNode);

  for (var key in defaultStyles) {
    var src = srcStyles[key];
    if (src && src !== defaultStyles[key] && src !== parStyles[key]) {
      target.style[key] = src;
    }
  }
}

exports['default'] = copyStyles;
module.exports = exports['default'];

},{}]},{},[1]);
