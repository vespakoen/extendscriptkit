## AE / Application (JSX)

Adds a couple of helper methods to `AE`'s `Application` prototype.

### Use

Add the following import to your project's `index.jsx` file:

**index.js**
```js
require('extendscriptkit/jsx/ae/Application')

app.undoable('Some Action Description', () => {
  // everything you do within here will be undoable
})

app.faster(() => {
  // code within here that adds or modifies layers or composition will be faster.
  // It adds a temporary composition and focuses it so AE doesn't have to do a lot of re-draws.
  // After your code in here has ran, the temporary composition will be removed.
})
```
