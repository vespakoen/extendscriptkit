CompItem.prototype.forLayers = function (cb) {
  const layers = this.layers
  const numLayers = layers.length
  for (var i = 1; i <= numLayers; i++) {
    cb(layers[i])
  }
}

CompItem.prototype.forSelectedLayers = function (cb) {
  const selectedLayers = this.selectedLayers
  const numSelectedLayers = selectedLayers.length
  if (numSelectedLayers !== 0) {
    for (var i = 0; i < numSelectedLayers; i++) {
      cb(selectedLayers[i])
    }
  }
}

// find a specific layer by name
CompItem.prototype.findLayer = function (name) {
  // loop through all layers
  for (var n = 0; n < this.numLayers; n++){
    var layer = this.layer(n+1)
    // find the target layer
    if (layer instanceof AVLayer && layer.name == name){
      return layer
    }
  }
  return null
}

CompItem.prototype.findPropertyGroup = function (layerName, propertyGroupName) {
  var layer, propertyGroup
  if (layer = this.findLayer(layerName)) {
    if (propertyGroup = layer.findPropertyGroup(propertyGroupName)) {
      return propertyGroup
    }
  }
  return null
}

CompItem.prototype.findProperty = function (layerName, propertyGroupName, propertyName) {
  var propertyGroup, property
  if (propertyGroup = this.findPropertyGroup(layerName, propertyGroupName)) {
    if (property = propertyGroup.findProperty(propertyName)) {
      return property
    }
  }
  return null
}
