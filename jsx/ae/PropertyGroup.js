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