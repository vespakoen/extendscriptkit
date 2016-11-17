"use strict";

var xLib;
try {
  xLib = new ExternalObject("lib:\PlugPlugExternalObject");
} catch (e) {
  alert("Missing ExternalObject: " + e);
}

// send an event to the tool VM
function dispatch(type, data) {
  if (!xLib) {
    return;
  }
  var eventObj = new CSXSEvent();
  eventObj.type = type;
  eventObj.data = data || '';
  eventObj.dispatch();
}

module.exports = dispatch;