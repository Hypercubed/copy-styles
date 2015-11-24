(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var isDefined = function isDefined(a) {
  return typeof a !== 'undefined';
};
var isUndefined = function isUndefined(a) {
  return typeof a === 'undefined';
};
var isObject = function isObject(a) {
  return a !== null && typeof a === 'object';
};

// from https://github.com/npm-dom/is-dom/blob/master/index.js
function isNode(val) {
  if (!isObject(val)) return false;
  if (isDefined(window) && isObject(window.Node)) return val instanceof window.Node;
  return typeof val.nodeType === 'number' && typeof val.nodeName === 'string';
}

var useComputedStyles = isDefined(window) && isDefined(window.getComputedStyle);

// Gets computed styles for an element
// from https://github.com/jquery/jquery/blob/master/src/css/var/getStyles.js
function getComputedStyles(node) {
  if (useComputedStyles) {
    var view = node.ownerDocument.defaultView;
    if (!view.opener) view = window;
    return view.getComputedStyle(node, null);
  } else {
    return node.currentStyle || node.style;
  }
}

/**
* Returns a collection of CSS property-value pairs
* @param  {Element} node A DOM element to copy styles from
* @param  {Object} [target] An optional object to copy styles to
* @param {(Object|Boolean)} [default=true] A collection of CSS property-value pairs, false: copy none, true: copy all
* @return {object} collection of CSS property-value pairs
* @api public
*/
function computedStyles(node) {
  var target = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var styleList = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  if (!isNode(node)) {
    throw new Error('parameter 1 is not of type \'Element\'');
  }

  if (styleList === false) return target;

  var computed = getComputedStyles(node);

  var keysArray;
  if (styleList === true) {
    keysArray = useComputedStyles ? computed : Object.keys(computed);
  } else {
    keysArray = Object.keys(styleList);
  }

  for (var i = 0, l = keysArray.length; i < l; i++) {
    var key = keysArray[i];

    var def = styleList === true || styleList[key];
    if (def === false || isUndefined(def)) continue; // copy never

    var value = /* computed.getPropertyValue(key) || */computed[key]; // using getPropertyValue causes error in IE11
    if (typeof value !== 'string' || value === '') continue; // invalid value

    if (def === true || value !== def) {
      // styleList === true || styleList[key] === true || styleList[key] !== value
      target[key] = value;
    }
  }

  return target;
}

// Copies computed styles from source Element to target Element as inline styles.
/**
* Copies computed styles from source to target
* @param  {Element} source A DOM element to copy styles from
* @param  {Element} target A DOM element to copy styles to
* @param {(Object|Boolean)} [default=true] collection of CSS property-value pairs, false: copy none, true: copy all
* @api public
*/
function copyStyles(source, target) {
  var styles = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  computedStyles(source, target.style, styles);
}

exports['default'] = copyStyles;
module.exports = exports['default'];

},{}]},{},[1]);
