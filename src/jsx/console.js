const dispatch = require('./bridge')

function _log(args, type) {
  var msg = args.join(',')
  var safeArgs = args.map(arg => {
    try {
      JSON.stringify(arg)
      return arg
    } catch (e) {
      return arg.toString()
    }
  })
  dispatch('CONSOLE_' + type, JSON.stringify(safeArgs))
  writeDebugLog(msg)
  $.writeln(msg)
}

function logConsole(...args) {
  _log(args, 'LOG')
}

function logError(...args) {
  _log(args, 'ERROR')
}

$.global.console = {
  log: logConsole,
  error: logError
}

module.exports = {
  log: logConsole,
  error: logError
}
