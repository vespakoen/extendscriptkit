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