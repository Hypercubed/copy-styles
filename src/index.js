
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

  var parStyles = computedStyles(target.parentNode);

  for (let key in defaultStyles) {
    var src = srcStyles[key];
    if (src && src !== defaultStyles[key] && src !== parStyles[key] ) {
      target.style[key] = src;
    }
  }
}

export default copyStyles;
