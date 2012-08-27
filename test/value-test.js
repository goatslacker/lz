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

exports.elem = function (lz, assert) {
  assert.equal(arr.lz().elem(5), true)
  assert.equal(arr.lz().elem(6), false)
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

exports.and = function (lz, assert) {
  assert.equal(
    [true, true, true, true]
    .lz()
    .and(),
    true
  )

  assert.equal(
    [true, true, false, true]
    .lz()
    .and(),
    false
  )
}

exports['and + more'] = function (lz, assert) {
  assert.equal(
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .lz()
    .map(function (n) { return n % 2 === 0 })
    .and(),
    false
  )
}

exports.any = function (lz, assert) {
  assert.equal(
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .lz()
    .any(function (n) { return n === 5 }),
    true
  )

  assert.equal(
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .lz()
    .any(function (n) { return n > 10 }),
    false
  )
}

exports.all = function (lz, assert) {
  assert.equal(
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .lz()
    .all(function (n) { return n === 5 }),
    false
  )

  assert.equal(
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .lz()
    .all(function (n) { return n < 10 }),
    true
  )
}

exports.or = function (lz, assert) {
  assert.equal(
    [false, false, false, false]
    .lz()
    .or(),
    false
  )

  assert.equal(
    [false, false, true, false]
    .lz()
    .or(),
    true
  )
}

exports.nil = function (lz, assert, _) {
  assert.equal(
    [null, null, null]
    .lz()
    .nil(),
    true
  )

  assert.equal(
    [null, undefined, undefined]
    .lz()
    .nil(),
    true
  )

  assert.equal(
    [null, null, false]
    .lz()
    .nil(),
    false
  )
}
