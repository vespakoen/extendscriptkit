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