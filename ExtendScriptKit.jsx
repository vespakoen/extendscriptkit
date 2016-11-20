(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./Project":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

Project.prototype.forItems = function (cb) {
  var numItems = this.numItems;
  for (var i = 1; i < numItems; i++) {
    var item = this.item(i);
    cb(item, i);
  }
};

Project.prototype.forFilteredItems = function (filter, cb) {
  var numItems = this.numItems;
  for (var i = 1; i < numItems; i++) {
    var item = this.item(i);
    filter(item) && cb(item, i);
  }
};

Project.prototype.forSelections = function (cb) {
  for (var i = 0; i < this.selection.length; i++) {
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"./bridge":4}],6:[function(require,module,exports){
'use strict';

var bridge = require('./bridge');
var console = require('./console');
var Application = require('./ae/Application');
var Composition = require('./ae/Composition');
var Project = require('./ae/Project');

module.exports = {
  bridge: bridge,
  console: console
};

},{"./ae/Application":1,"./ae/Composition":2,"./ae/Project":3,"./bridge":4,"./console":5}],7:[function(require,module,exports){
'use strict';

var _require = require('./index'),
    console = _require.console,
    bridge = _require.bridge;

$.global.console = console;
$.global.bridge = bridge;

},{"./index":6}]},{},[7]);
