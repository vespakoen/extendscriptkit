Project.prototype.forItems = function (cb) {
  const numItems = this.numItems
  for (var i = 1; i <= numItems; i++) {
    const item = this.item(i)
    cb(item, i)
  }
}

Project.prototype.forFilteredItems = function (filter, cb) {
  const numItems = this.numItems
  for (var i = 1; i <= numItems; i++) {
    const item = this.item(i)
    filter(item) && cb(item, i)
  }
}

Project.prototype.forSelections = function (cb) {
  for (var i = 0; i < this.selection.length; i++) {
    cb(this.selection[i], i)
  }
}

Project.prototype.forCompositions = function (cb) {
  this.forFilteredItems(
    item => item instanceof CompItem,
    cb
  )
}

Project.prototype.forCompositionsWithName = function (name, cb) {
  this.forFilteredItems(
    item => item instanceof CompItem && item.name === name,
    cb
  )
}
