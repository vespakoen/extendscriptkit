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
