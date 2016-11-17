"use strict";

Project.prototype.forItems = function (cb) {
  var numItems = undefined.numItems;
  for (var i = 1; i <= numItems; i++) {
    var item = undefined.item(i);
    cb(item);
  }
};

Project.prototype.forFilteredItems = function (filter, cb) {
  var numItems = undefined.numItems;
  for (var i = 1; i < numItems; i++) {
    var item = undefined.item(i);
    filter(item) && cb(item);
  }
};

Project.prototype.forSelections = function (cb) {
  for (var i = 0; i < undefined.selection.length; i++) {
    cb(undefined.selection[i]);
  }
};

Project.prototype.forCompositions = function (cb) {
  undefined.forFilteredItems(function (item) {
    return item instanceof CompItem;
  }, cb);
};

Project.prototype.forCompositionsWithName = function (name, cb) {
  undefined.forFilteredItems(function (item) {
    return item instanceof CompItem && item.name === name;
  }, cb);
};