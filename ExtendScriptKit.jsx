(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

AVLayer.prototype.findPropertyGroup = function (name) {
  // loop through layer property groups
  for (var i = 0; i < this.numProperties; i++) {
    var group = this.property(i + 1);
    // find the target property group
    if (group instanceof PropertyGroup && group.name == name) {
      return group;
    }
  }
  return null;
};

AVLayer.prototype.findProperty = function (propertyGroupName, propertyName) {
  var propertyGroup, property;
  if (propertyGroup = this.findPropertyGroup(propertyGroupName)) {
    if (property = propertyGroup.findProperty(propertyName)) {
      return property;
    }
  }
  return null;
};

},{}],2:[function(require,module,exports){
'use strict';

require('./Project');

Application.prototype.undoable = function (name, cb) {
  app.beginUndoGroup(name);
  cb();
  app.endUndoGroup();
};

Application.prototype.faster = function (cb) {
  var tempOverlay = app.project.items.addComp('WORKING_PLEASE_WAIT', 10, 10, 1, 1, 12);
  tempOverlay.openInViewer();
  cb();
  tempOverlay.remove();
  app.project.forCompositionsWithName('WORKING_PLEASE_WAIT', function (composition) {
    return composition.remove();
  });
};

Application.prototype.activeItemIsComposition = function () {
  return app.project && app.project.activeItem && app.project.activeItem instanceof CompItem;
};

},{"./Project":4}],3:[function(require,module,exports){
"use strict";

CompItem.prototype.forLayers = function (cb) {
  var layers = this.layers;
  var numLayers = layers.length;
  for (var i = 1; i <= numLayers; i++) {
    cb(layers[i]);
  }
};

CompItem.prototype.forSelectedLayers = function (cb) {
  var selectedLayers = this.selectedLayers;
  var numSelectedLayers = selectedLayers.length;
  if (numSelectedLayers !== 0) {
    for (var i = 0; i < numSelectedLayers; i++) {
      cb(selectedLayers[i]);
    }
  }
};

// find a specific layer by name
CompItem.prototype.findLayer = function (name) {
  // loop through all layers
  for (var n = 0; n < this.numLayers; n++) {
    var layer = this.layer(n + 1);
    // find the target layer
    if (layer instanceof AVLayer && layer.name == name) {
      return layer;
    }
  }
  return null;
};

CompItem.prototype.findPropertyGroup = function (layerName, propertyGroupName) {
  var layer, propertyGroup;
  if (layer = this.findLayer(layerName)) {
    if (propertyGroup = layer.findPropertyGroup(propertyGroupName)) {
      return propertyGroup;
    }
  }
  return null;
};

CompItem.prototype.findProperty = function (layerName, propertyGroupName, propertyName) {
  var propertyGroup, property;
  if (propertyGroup = this.findPropertyGroup(layerName, propertyGroupName)) {
    if (property = propertyGroup.findProperty(propertyName)) {
      return property;
    }
  }
  return null;
};

},{}],4:[function(require,module,exports){
"use strict";

Project.prototype.forItems = function (cb) {
  for (var i = this.numItems; i > 0; i--) {
    var item = this.item(i);
    cb(item, i);
  }
};

Project.prototype.forFilteredItems = function (filter, cb) {
  for (var i = this.numItems; i > 0; i--) {
    var item = this.item(i);
    filter(item) && cb(item, i);
  }
};

Project.prototype.forSelections = function (cb) {
  for (var i = this.selection.length - 1; i >= 0; i--) {
    cb(this.selection[i], i);
  }
};

Project.prototype.forCompositions = function (cb) {
  this.forFilteredItems(function (item) {
    return item instanceof CompItem;
  }, cb);
};

Project.prototype.forCompositionsWithName = function (name, cb) {
  this.forFilteredItems(function (item) {
    return item instanceof CompItem && item.name === name;
  }, cb);
};

// find a composition by name
Project.prototype.findComposition = function (compositionName) {
  // loop through all project items
  for (var i = 0; i < this.numItems; i++) {
    var composition = this.item(i + 1);
    // find the composition
    if (composition instanceof CompItem && composition.name === compositionName) {
      return composition;
    }
  }
  return null;
};

Project.prototype.findLayer = function (compositionName, layerName) {
  var composition, layer;
  if (composition = this.findComposition(compositionName)) {
    if (layer = composition.findLayer(layerName)) {
      return layer;
    }
  }
  return null;
};

Project.prototype.findPropertyGroup = function (compositionName, layerName, propertyGroupName) {
  var layer, propertyGroup;
  if (layer = this.findLayer(compositionName, layerName)) {
    if (propertyGroup = layer.findPropertyGroup(propertyGroupName)) {
      return propertyGroup;
    }
  }
  return null;
};

Project.prototype.findProperty = function (compositionName, layerName, propertyGroupName, propertyName) {
  var propertyGroup, property;
  if (propertyGroup = this.findPropertyGroup(compositionName, layerName, propertyGroupName)) {
    if (property = propertyGroup.findProperty(propertyName)) {
      return property;
    }
  }
  return null;
};

},{}],5:[function(require,module,exports){
"use strict";

PropertyGroup.prototype.findProperty = function (name) {
  // Loop through individual properties
  for (var i = 0; i < this.numProperties; i++) {
    // find the property
    if (this.property(i + 1).name === name) {
      return this.property(i + 1);
    }
  }
  return null;
};

},{}],6:[function(require,module,exports){
"use strict";

var xLib;
try {
  xLib = new ExternalObject("lib:\PlugPlugExternalObject");
} catch (e) {
  alert("Missing ExternalObject: " + e);
}

// send an event to the tool VM
function dispatch(type, data) {
  if (!xLib) {
    return;
  }
  var eventObj = new CSXSEvent();
  eventObj.type = type;
  eventObj.data = data || '';
  eventObj.dispatch();
}

module.exports = dispatch;

},{}],7:[function(require,module,exports){
'use strict';

var dispatch = require('./bridge');

function _log(args, type) {
  var msg = args.join(',');
  var safeArgs = args.map(function (arg) {
    try {
      JSON.stringify(arg);
      return arg;
    } catch (e) {
      return arg.toString();
    }
  });
  dispatch('CONSOLE_' + type, JSON.stringify(safeArgs));
  writeDebugLog(msg);
  $.writeln(msg);
}

function logConsole() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  _log(args, 'LOG');
}

function logError() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  _log(args, 'ERROR');
}

$.global.console = {
  log: logConsole,
  error: logError
};

module.exports = {
  log: logConsole,
  error: logError
};

},{"./bridge":6}],8:[function(require,module,exports){
'use strict';

var bridge = require('./bridge');
var console = require('./console');
require('./ae/Application');
require('./ae/Composition');
require('./ae/Project');
require('./ae/AVLayer');
require('./ae/PropertyGroup');

module.exports = {
  bridge: bridge,
  console: console
};

},{"./ae/AVLayer":1,"./ae/Application":2,"./ae/Composition":3,"./ae/Project":4,"./ae/PropertyGroup":5,"./bridge":6,"./console":7}],9:[function(require,module,exports){
'use strict';

var _require = require('./index'),
    console = _require.console,
    bridge = _require.bridge;

$.global.console = console;
$.global.bridge = bridge;

},{"./index":8}]},{},[9]);
