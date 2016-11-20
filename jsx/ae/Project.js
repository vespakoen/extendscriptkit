"use strict";

Project.prototype.forItems = function (cb) {
  for (var i = this.numItems - 1; i > 0; i--) {
    var item = this.item(i);
    cb(item, i);
  }
};

Project.prototype.forFilteredItems = function (filter, cb) {
  for (var i = this.numItems - 1; i > 0; i--) {
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