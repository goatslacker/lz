var arr = [1, 2, 3, 4, 5]
var head = 1
var last = 5
var init = [1, 2, 3, 4]
var tail = [2, 3, 4, 5]

exports.head = function (lz, assert) {
  assert.equal(arr.lz().head(), head)
}

exports.last = function (lz, assert) {
  assert.equal(arr.lz().last(), last)
}

exports.tail = function (lz, assert) {
  assert.deepEqual(arr.lz().tail(), tail)
}

exports.init = function (lz, assert) {
  assert.deepEqual(arr.lz().init(), init)
}
