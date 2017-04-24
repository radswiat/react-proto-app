var jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;

// WARNING!
// below code will cause enzyme to fail, even if that is preferred by enzyme, it just doesn't work
// it cause Maximum stack limit during the mount() and render()
// do not bring this back unless you are sure what u doing
// https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
// Radek
//
// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     global[property] = document.defaultView[property];
//   }
// });

global.navigator = {
  userAgent: 'node.js'
};
