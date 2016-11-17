Application.prototype.undoable = function (name, cb) {
  app.beginUndoGroup(name)
  cb()
  app.endUndoGroup()
}

Application.prototype.faster = function (cb) {
  const tempOverlay = app.project.items.addComp('WORKING_PLEASE_WAIT', 10, 10, 1, 1, 12)
  tempOverlay.openInViewer()
  cb()
  tempOverlay.remove()
  app.project.forCompositionsWithName(
    'WORKING_PLEASE_WAIT',
    composition => composition.remove()
  )
}
