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