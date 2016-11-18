# ExtendScriptKit

Shims and helpers for ExtendScript, adds some methods to built-in prototypes.
Mostly for AE at the moment and can only be used in combination with Browserify.

See [modern-extendscript](https://github.com/vespakoen/modern-extendscript) as an example.

## Installing

```shell
npm install --save-dev extendscriptkit
```

If you don't want to use Browserify, you can download the zip of this repository and use the ExtendScriptKit.jsx bundle (note: untested)

## Features

Help me add more =)

### AE Helpers

- `Application.prototype.`
  - `undoable(nameOfAction, func)` - Easy undo
  - `faster(func)` - Creates a temporary new composition for when doing a lot of updates. (around 2x speed increase)
- `Project.prototype.`
  - `forItems(cb)` - Calls back for each item in the project
  - `forFilteredItems(filterFn, cb)` - Calls back for each item for which the filterFn returned true
  - `forSelections(cb)` - Calls back with selections in this project
  - `forCompositions(cb)` - Calls back with compositions in this project
  - `forCompositionsWithName(name, cb)` - Calls back with compositions that match the given name
- `CompItem.prototype.`
  - `forLayers(cb)` - Calls back for each layer in the composition
  - `forSelectedLayers(cb)` - Calls back for each selected layer in the composition

### Console

It adds `console.log` and `console.error` support to JSX, errors will show up in your Panel's window as well as the chrome remote debugger, ExtendScript Toolkit and a logfile.

### Bridge

The bridge provides a simple way to send a message from JSX to JS.

## API documentation and examples

### AE / Application (JSX)

Adds a couple of helper methods to `AE`'s `Application` prototype.

#### Use

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
### AE / Composition (JSX)

Adds a couple of helper methods to `AE`'s `CompItem` prototype.

#### Use

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
### AE / Project (JSX)

Adds a couple of helper methods to `AE`'s `Project` prototype.

#### Use

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
### Bridge (JS / JSX)

The bridge allows communication between JS and JSX.
On the JSX end it exposes a dispatch(type, data) method and
On the JS end it exposes the CSInterface.

#### Use

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
### Console (JS / JSX)

Shims the console in JSX files.
The `console.log`'s will go to the remote chrome debugger, ExtendScript Toolkit and
the debug log file.

Additionally, `console.error`'s will be written to panel's <body> as well.

#### Use

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
