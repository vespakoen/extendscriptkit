"use strict";

Project.prototype.forItems = function (cb) {
  var numItems = this.numItems;
  for (var i = 1; i <= numItems; i++) {
    var item = this.item(i);
    cb(item, i);
  }
};

Project.prototype.forFilteredItems = function (filter, cb) {
  var numItems = this.numItems;
  for (var i = 1; i <= numItems; i++) {
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
