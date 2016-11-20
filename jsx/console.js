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
}

module.exports = {
  log: logConsole,
  error: logError
};
