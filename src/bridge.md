## Bridge (JS / JSX)

The bridge allows communication between JS and JSX.
On the JSX end it exposes a dispatch(type, data) method and
On the JS end it exposes the CSInterface.

### Use

Add the following imports to your project's `index.js` and `index.jsx` file:

**index.js**
```js
const bridge = require('extendscriptkit/js/bridge')

bridge.addEventListener('MY_EVENT', data => {
  console.log(data)
})
```

**index.jsx**
```js
const dispatch = require('extendscriptkit/jsx/bridge')

dispatch('MY_EVENT', 'Hello World')
```
