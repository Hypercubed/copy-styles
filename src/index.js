
import computedStyles from 'computed-styles';

// http://www.w3.org/TR/SVG/propidx.html
// via https://github.com/svg/svgo/blob/master/plugins/_collections.js
const inheritableAttrs = [
  'clip-rule',
  'color',
  'color-interpolation',
  'color-interpolation-filters',
  'color-profile',
  'color-rendering',
  'cursor',
  'direction',
  'fill',
  'fill-opacity',
  'fill-rule',
  'font',
  'font-family',
  'font-size',
  'font-size-adjust',
  'font-stretch',
  'font-style',
  'font-variant',
  'font-weight',
  'glyph-orientation-horizontal',
  'glyph-orientation-vertical',
  'image-rendering',
  'kerning',
  'letter-spacing',
  'marker',
  'marker-end',
  'marker-mid',
  'marker-start',
  'pointer-events',
  'shape-rendering',
  'stroke',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'stroke-opacity',
  'stroke-width',
  'text-anchor',
  'text-rendering',
  'transform',
  'visibility',
  'white-space',
  'word-spacing',
  'writing-mode'
];

// Copies computed styles from source to target
/**
* Copies computed styles from source to target
* @param  {element} source A DOM element to copy styles from
* @param  {element} target A DOM element to copy styles to
* @param {(object|boolean)} [defaultStyles=true] collection of CSS property-value pairs, false: copy none, true: copy all
* @api public
*/
function copyStyles(source, target, defaultStyles = true) {
  if (defaultStyles === false) { return; }

  var srcStyles = computedStyles(source);

  if (defaultStyles === true) {    // copy all styles
    for (let key in srcStyles) {
      target.style[key] = srcStyles[key];
    }
    return;
  }

  var parStyles = computedStyles(target.parentNode);

  for (let key in defaultStyles) {

    var def = defaultStyles[key];
    if (def === false) continue;  // copy never

    var src = srcStyles[key];
    if (typeof src !== "string") continue; // invalid

    if (defaultStyles[key] === true || src !== def) {
      if (inheritableAttrs.indexOf(key) < 0 || src !== parStyles[key]) {  // special rule for inheritables
        target.style[key] = src;
      }
    }

  }
}

export default copyStyles;
