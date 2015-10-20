
import computedStyles from 'computed-styles';

// Copies computed styles from source Element to target Element as inline styles.
/**
* Copies computed styles from source to target
* @param  {Element} source A DOM element to copy styles from
* @param  {Element} target A DOM element to copy styles to
* @param {(Object|Boolean)} [default=true] collection of CSS property-value pairs, false: copy none, true: copy all
* @api public
*/
function copyStyles(source, target, styles = true) {
  if (styles === false) { return; }

  var srcStyles = computedStyles(source);

  if (styles === true) {    // copy all styles
    for (let key in srcStyles) {
      target.style[key] = srcStyles[key];
    }
    return;
  }

  for (let key in styles) {

    var def = styles[key];
    if (def === false) continue;  // copy never

    var src = srcStyles[key];
    if (typeof src !== "string" || src === '') continue; // invalid

    if (styles[key] === true || src !== def) {
      target.style[key] = src;
    }

  }
}

export default copyStyles;
