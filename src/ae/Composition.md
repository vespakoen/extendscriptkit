## AE / Composition (JSX)

Adds a couple of helper methods to `AE`'s `CompItem` prototype.

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
