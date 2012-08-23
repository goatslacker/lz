exports['instance of'] = function (lz, assert) {
  assert.equal([1].lz() instanceof lz, true)
  assert.equal(lz([1]) instanceof lz, true)
  assert.equal(lz('hi') instanceof lz, true)
}

exports.array = function (lz, assert) {
  assert.equal([1].lz().head(), 1)
}

exports.strings = function (lz, assert) {
  assert.equal(lz('hello').head(), 'h')
  assert.deepEqual(lz('hello').take(3), ['h', 'e', 'l'])
}

exports.args = function (lz, assert) {
  (function () {
    assert.equal(lz(arguments).head(), 1)
    assert.deepEqual(lz(arguments).take(2), [1, 2])
  }(1, 2, 3))
}

exports['unsupported crap'] = function (lz, assert) {
  assert.equal(lz(3).head(), undefined)
  assert.equal(lz({ sorry: true }).head(), undefined)
  assert.equal(lz(/no support/).head(), undefined)
  assert.equal(lz(function () { }).head(), null)
  assert.equal(lz(function (a) { }).head(), undefined)
  assert.equal(lz(false).head(), undefined)
  assert.equal(lz({ 0: 'ok', 1: 'this', 2: 'works' }).head(), 'ok')
}
