var arr = [1, 2, 3, 4, 5]
var head = 1
var last = 5
var init = [1, 2, 3, 4]
var tail = [2, 3, 4, 5]

module.exports = {

  head: function (lz, assert) {
    assert.equal(lz(arr).head(), head)
  },

  last: function (lz, assert) {
    assert.equal(lz(arr).last(), last)
  },

  tail: function (lz, assert) {
    assert.deepEqual(lz(arr).tail().$(), tail)
  },

  init: function (lz, assert) {
    assert.deepEqual(lz(arr).init().$(), init)
  },

  elem: function (lz, assert) {
    assert.equal(lz(arr).elem(5), true)
    assert.equal(lz(arr).elem(6), false)
  },

  'tail and more': function (lz, assert) {
    assert.equal(
      lz(arr)
      .tail()
      .filter(function (n) {
        return n % 2 !== 0
      })
      .head(),
      3
    )

    assert.deepEqual(
      lz(arr)
      .tail()
      .filter(function (n) {
        return n % 2 !== 0
      })
      .$(),
      [3, 5]
    )

    assert.deepEqual(
      lz(arr)
      .tail()
      .takeWhile(function (n) {
        return n < 4
      })
      .drop(1)
      .$(),
      [3]
    )

    assert.deepEqual(
      lz(arr)
      .tail()
      .take(2)
      .drop(1)
      .$(),
      [3]
    )
  },

  and: function (lz, assert) {
    assert.equal(
      lz([true, true, true, true])
      .and(),
      true
    )

    assert.equal(
      lz([true, true, false, true])
      .and(),
      false
    )
  },

  'and + more': function (lz, assert) {
    assert.equal(
      lz([1, 2, 3, 4, 5, 6, 7, 8, 9])
      .map(function (n) { return n % 2 === 0 })
      .and(),
      false
    )
  },

  any: function (lz, assert) {
    assert.equal(
      lz([1, 2, 3, 4, 5, 6, 7, 8, 9])
      .any(function (n) { return n === 5 }),
      true
    )

    assert.equal(
      lz([1, 2, 3, 4, 5, 6, 7, 8, 9])
      .any(function (n) { return n > 10 }),
      false
    )
  },

  all: function (lz, assert) {
    assert.equal(
      lz([1, 2, 3, 4, 5, 6, 7, 8, 9])
      .all(function (n) { return n === 5 }),
      false
    )

    assert.equal(
      lz([1, 2, 3, 4, 5, 6, 7, 8, 9])
      .all(function (n) { return n < 10 }),
      true
    )
  },

  or: function (lz, assert) {
    assert.equal(
      lz([false, false, false, false])
      .or(),
      false
    )

    assert.equal(
      lz([false, false, true, false])
      .or(),
      true
    )
  },

  nil: function (lz, assert) {
    assert.equal(
      lz([null, null, null])
      .nil(),
      true
    )

    assert.equal(
      lz([null, undefined, undefined])
      .nil(),
      true
    )

    assert.equal(
      lz([null, null, false])
      .nil(),
      false
    )
  },

  batman: function (lz, assert) {
    assert.equal(
      lz(['Na'])
        .cycle()
        .take(10)
        .toString(' ') + ' Batman!',
      'Na Na Na Na Na Na Na Na Na Na Batman!'
    )

    assert.equal(
      lz.replicate(2, 'foo').toString('-'),
      ['foo-foo']
    )
  }
}
