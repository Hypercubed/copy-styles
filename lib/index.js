'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _computedStyles = require('computed-styles');

var _computedStyles2 = _interopRequireDefault(_computedStyles);

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

  var srcStyles = (0, _computedStyles2['default'])(source);

  if (defaultStyles === true) {
    // copy all styles
    for (var key in srcStyles) {
      target.style[key] = srcStyles[key];
    }
    return;
  }

  var parStyles = (0, _computedStyles2['default'])(target.parentNode);

  for (var key in defaultStyles) {
    var src = srcStyles[key];
    if (src && src !== defaultStyles[key] && src !== parStyles[key]) {
      target.style[key] = src;
    }
  }
}

exports['default'] = copyStyles;
module.exports = exports['default'];