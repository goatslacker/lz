module.exports = {
  'instance of': function (lz, assert) {
    assert.equal(lz([1]) instanceof lz, true)
    assert.equal(lz('hi') instanceof lz, true)
  },

  array: function (lz, assert) {
    assert.equal(lz([1]).head(), 1)
  },

  strings: function (lz, assert) {
    assert.equal(lz('hello').head(), 'h')
    assert.deepEqual(lz('hello').take(3).$(), ['h', 'e', 'l'])
  },

  args: function (lz, assert) {
    (function () {
      assert.equal(lz(arguments).head(), 1)
      assert.deepEqual(lz(arguments).take(2).$(), [1, 2])
    }(1, 2, 3))
  },

  'unsupported crap': function (lz, assert) {
    assert.equal(lz(3).head(), undefined)
    assert.equal(lz({ sorry: true }).head(), undefined)
    assert.equal(lz(/no support/).head(), undefined)
    assert.equal(lz(function () { }).head(), null)
    assert.equal(lz(function (a) { }).head(), undefined)
    assert.equal(lz(false).head(), undefined)
    assert.equal(lz({ 0: 'ok', 1: 'this', 2: 'works' }).head(), 'ok')
  }
}
