var str = 'hello'
var arr = [1, 2, 3]

module.exports = {
  'array at': function (lz, assert) {
    assert.equal(lz(arr).at(1), 2)
    assert.equal(lz(arr).at(3), null)
  },

  'array at negative': function (lz, assert) {
    assert.equal(lz(arr).at(-1), 3)
    assert.equal(lz(arr).at(-3), 1)
    assert.equal(lz(arr).at(-42), null)
  },

  'string at': function (lz, assert) {
    assert.equal(lz(str).at(0), 'h')
    assert.equal(lz(str).at(4), 'o')
    assert.equal(lz(str).at(5), null)
  },

  'string at negative': function (lz, assert) {
    assert.equal(lz(str).at(-1), 'o')
    assert.equal(lz(str).at(-5), 'h')
    assert.equal(lz(str).at(-6), null)
  }
}
