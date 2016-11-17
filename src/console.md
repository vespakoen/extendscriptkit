## Console (JS / JSX)

Shims the console in JSX files.
The `console.log`'s will go to the remote chrome debugger, ExtendScript Toolkit and
the debug log file.

Additionally, `console.error`'s will be written to panel's <body> as well.

### Use

Add the following imports to your project's `index.js` and `index.jsx` file:

**index.js**
```js
const bridge = require('extendscriptkit/js/bridge')
require('extendscriptkit/js/console')(bridge)
```

**index.jsx**
```js
require('extendscriptkit/jsx/console')
```

You can now use `console.log()` and `console.error()` in any JSX file.
