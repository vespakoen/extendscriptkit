'use strict';

require('./Project');

Application.prototype.undoable = function (name, cb) {
  app.beginUndoGroup(name);
  cb();
  app.endUndoGroup();
};

Application.prototype.faster = function (cb) {
  var tempOverlay = app.project.items.addComp('WORKING_PLEASE_WAIT', 10, 10, 1, 1, 12);
  tempOverlay.openInViewer();
  cb();
  tempOverlay.remove();
  app.project.forCompositionsWithName('WORKING_PLEASE_WAIT', function (composition) {
    return composition.remove();
  });
};

Application.prototype.activeItemIsComposition = function () {
  return app.project && app.project.activeItem && app.project.activeItem instanceof CompItem;
};