# computed-style

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][download-badge]][npm-url]

Copies computed styles from source DOM Element to target DOM Element as inline styles.

## Install

```sh
npm install Hypercubed/copy-styles
```

## Usage

```js
import copyStyles from 'copy-styles';

const source = document.querySelector('#node1');
const target = document.querySelector('#node1');

copyStyles(source, target);
```

#### Styles object

An optional third parameter can be passed to `copyStyles`.  If true all computed styles are copied.  If false no styles are copied (function has no effect).  If the third parameter is an object only those keys with a truthy value are copied. If a value is false or equal to the value of the that property it will not be copied.  For example:

```js
copyStyles(source, target, {
	'color': true,
	'font-family': false,
	'margin-left': '0px'
});
```

In this case, the `color` style will be copied, `font-family` will not (same result if `font-family` is absent), `margin-left` will only be copied if not equal to '0px'.

See [API](API.md)

## License

MIT © [J. Harshbarger](http://github.com/Hypercubed)

[npm-url]: https://npmjs.org/package/copy-styles
[npm-image]: https://img.shields.io/npm/v/copy-styles.svg?style=flat-square

[travis-url]: https://travis-ci.org/Hypercubed/copy-styles
[travis-image]: https://img.shields.io/travis/Hypercubed/copy-styles.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/copy-styles.svg?style=flat-square
