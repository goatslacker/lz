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
  assert.deepEqual(arr.lz().tail().$(), tail)
}

exports.init = function (lz, assert) {
  assert.deepEqual(arr.lz().init().$(), init)
}

exports.has = function (lz, assert) {
  assert.equal(arr.lz().has(5), true)
  assert.equal(arr.lz().has(6), false)
}

exports['tail and more'] = function (lz, assert) {
  assert.equal(
    arr
    .lz()
    .tail()
    .filter(function (n) {
      return n % 2 !== 0
    })
    .head(),
    3
  )

  assert.deepEqual(
    arr
    .lz()
    .tail()
    .filter(function (n) {
      return n % 2 !== 0
    })
    .$(),
    [3, 5]
  )

  assert.deepEqual(
    arr
    .lz()
    .tail()
    .takeWhile(function (n) {
      return n < 4
    })
    .drop(1)
    .$(),
    [3]
  )

  assert.deepEqual(
    arr
    .lz()
    .tail()
    .take(2)
    .drop(1)
    .$(),
    [3]
  )
}
