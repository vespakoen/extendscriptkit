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