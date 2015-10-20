global.document = require('jsdom').jsdom();
global.window = global.document.parentWindow;
global.window.isJSDOM = true;

require('./');
