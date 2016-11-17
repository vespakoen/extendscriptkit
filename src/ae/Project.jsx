Project.prototype.forItems = cb => {
  const numItems = this.numItems
  for (var i = 1; i <= numItems; i++) {
    const item = this.item(i)
    cb(item)
  }
}

Project.prototype.forFilteredItems = (filter, cb) => {
  const numItems = this.numItems
  for (var i = 1; i < numItems; i++) {
    const item = this.item(i)
    filter(item) && cb(item)
  }
}

Project.prototype.forSelections = cb => {
  for (var i = 0; i < this.selection.length; i++) {
    cb(this.selection[i])
  }
}

Project.prototype.forCompositions = cb => {
  this.forFilteredItems(
    item => item instanceof CompItem,
    cb
  )
}

Project.prototype.forCompositionsWithName = (name, cb) => {
  this.forFilteredItems(
    item => item instanceof CompItem && item.name === name,
    cb
  )
}
