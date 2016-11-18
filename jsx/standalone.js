'use strict';

var _require = require('./index'),
    console = _require.console,
    bridge = _require.bridge;

$.global.console = console;
$.global.bridge = bridge;