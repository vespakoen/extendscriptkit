const bridge = require('./bridge')
const console = require('./console')
require('./ae/Application')
require('./ae/Composition')
require('./ae/Project')
require('./ae/AVLayer')
require('./ae/PropertyGroup')

module.exports = {
  bridge,
  console
}
