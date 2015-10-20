
import computedStyles from 'computed-styles';

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

  for (let key in defaultStyles) {

    var def = defaultStyles[key];
    if (def === false) continue;  // copy never

    var src = srcStyles[key];
    if (typeof src !== "string") continue; // invalid

    if (defaultStyles[key] === true || src !== def) {
      target.style[key] = src;
    }

  }
}

export default copyStyles;
