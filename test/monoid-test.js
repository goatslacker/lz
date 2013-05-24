var assert = require('assert')
var lz = require('../')

module.exports = function (lz, assert) {
  var eq = assert.deepEqual
  var m = new lz([1, 2, 3])

  return {
    rightIdentity: function () {
      eq(
        m.concat(m.empty()).toArray(),
        m.toArray()
      )
    },

    leftIdentity: function () {
      eq(
        m.empty().concat(m).toArray(),
        m.toArray()
      )
    }
  }
}
