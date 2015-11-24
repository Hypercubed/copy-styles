'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _computedStyles = require('computed-styles');

var _computedStyles2 = _interopRequireDefault(_computedStyles);

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

  (0, _computedStyles2['default'])(source, target.style, styles);
}

exports['default'] = copyStyles;
module.exports = exports['default'];