# computed-style

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][download-badge]][npm-url]

> Copies computed styles from source to target

## Install

```sh
npm install Hypercubed/copy-styles
```

## Usage

```js
import copyStyles from 'copy-styles';

const source = document.querySelector('#node1');
const target = document.querySelector('#node1');

copyStyles(source, target)
```

See [API](API.md)

## License

MIT © [J. Harshbarger](http://github.com/Hypercubed)

[npm-url]: https://npmjs.org/package/copy-styles
[npm-image]: https://img.shields.io/npm/v/copy-styles.svg?style=flat-square

[travis-url]: https://travis-ci.org/Hypercubed/copy-styles
[travis-image]: https://img.shields.io/travis/Hypercubed/copy-styles.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/copy-styles.svg?style=flat-square
