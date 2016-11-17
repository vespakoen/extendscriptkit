# ExtendScriptKit

Shims and helpers for ExtendScript, adds some methods to built-in prototypes.
Mostly for AE at the moment and can only be used in combination with Browserify.

See [modern-extendscript](https://github.com/vespakoen/modern-extendscript) as an example.

## Installing

```shell
npm install --save-dev extendscriptkit
```

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

[Go to API.md](API.md)
