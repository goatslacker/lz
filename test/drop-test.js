module.exports = {
  drop: function (lz, assert) {
    assert.deepEqual(
      lz([1, 2, 3]).drop(2).$(),
      [3]
    )

    assert.equal(
      lz([1, 2, 3]).drop(2).head(),
      3
    )
  },

  'dropping too much': function (lz, assert) {
    assert.deepEqual(
      lz([1, 2, 3]).drop(17).$(),
      []
    )
  },

  'dropping and reseting': function (lz, assert) {
    var a = [1, 2, 3, 4, 5, 6]
    assert.deepEqual(
      lz(a)
      .filter(function (n) {
        return n % 2 === 0
      })
      .drop(2)
      ._list,
      // i'm cheating here, using list to check our internal list
      // this makes sure that we aren't filtering past our dropping point
      [5, 6]
    )

    assert.deepEqual(
      lz(a)
      .filter(function (n) {
        return n % 2 === 0
      })
      .drop(2)
      .$(),
      // the .$/.toArray function will however evaluate the entire list
      [6]
    )
  },

  'dropping then reusing': function (lz, assert, data) {
    assert.equal(
      lz(data.a)
      .filter(function (n) {
        return n % 2 === 0
      })
      .drop(5)
      .map(function (n) {
        return n * n
      })
      .head(),
      400
    )
  }
}



