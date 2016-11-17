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
## AE / Composition (JSX)

Adds a couple of helper methods to `AE`'s `Composition` prototype.

### Use

Add the following import to your project's `index.jsx` file:

**index.js**
```js
require('extendscriptkit/jsx/ae/Composition')

app.project.forCompositions(composition => { // see Project API
  composition.forLayers(layer => {
    // do something with layer
  })

  composition.forSelectedLayers(selectedLayer => {
    // do something with selected layer
  })
})
```
## AE / Project (JSX)

Adds a couple of helper methods to `AE`'s `Project` prototype.

### Use

Add the following import to your project's `index.jsx` file:

**index.js**
```js
require('extendscriptkit/jsx/ae/Project')

app.project.forItems(item => {
  // do something with item
})

app.project.forFilteredItems(
  item => item.name === 'Test',
  item => {
    // do something with item named 'Test'
  }
)

app.project.forSelections(selection => {
  // do something with selection
})

app.project.forCompositions(composition => {
  // do something with composition
})

app.project.forCompositionsWithName('compy', (composition) => {
  // do something with compositions named 'compy'
})
```
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
