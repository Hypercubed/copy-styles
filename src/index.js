
import computedStyles from 'computed-styles';

// Copies computed styles from source Element to target Element as inline styles.
/**
* Copies computed styles from source to target
* @param  {Element} source A DOM element to copy styles from
* @param  {Element} target A DOM element to copy styles to
* @param {(Object|Boolean)} [default=true] collection of CSS property-value pairs, false: copy none, true: copy all
* @api public
*/
function copyStyles (source, target, styles = true) {
  computedStyles(source, target.style, styles);
}

export default copyStyles;
