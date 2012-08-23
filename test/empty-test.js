exports.empty = function (lz, assert) {
  // empty string list
  assert.equal(
    lz(['']).head(),
    ''
  )
}

exports.nil = function (lz, assert) {
  // null
  assert.equal(
    lz([null]).head(),
    null
  )
}

exports.falsy = function (lz, assert) {
  // false
  assert.equal(
    lz([false]).head(),
    false
  )
}

exports.notdefined = function (lz, assert) {
  // undefined
  assert.deepEqual(
    lz([false, undefined, undefined]).take(3).list,
    [false, undefined, undefined]
  )
}

exports['result that does not exist'] = function (lz, assert) {
  assert.equal(
    lz([1, 2])
    .filter(function (n) { return n === 3 })
    .head(),
    null
  )
}
