exports.drop = function (lz, assert) {
  assert.deepEqual(
    [1, 2, 3].lz().drop(2).$(),
    [3]
  )

  assert.equal(
    [1, 2, 3].lz().drop(2).head(),
    3
  )
}

exports['dropping too much'] = function (lz, assert) {
  assert.deepEqual(
    [1, 2, 3].lz().drop(17).$(),
    []
  )
}

exports['dropping and reseting'] = function (lz, assert) {
  var a = [1, 2, 3, 4, 5, 6]
  assert.deepEqual(
    a
    .lz()
    .filter(function (n) {
      return n % 2 === 0
    })
    .drop(2)
    .list,
    // i'm cheating here, using list to check our internal list
    // this makes sure that we aren't filtering past our dropping point
    [5, 6]
  )

  assert.deepEqual(
    a
    .lz()
    .filter(function (n) {
      return n % 2 === 0
    })
    .drop(2)
    .$(),
    // the .$/.toArray function will however evaluate the entire list
    [6]
  )
}

exports['dropping then reusing'] = function (lz, assert, _) {
  assert.equal(
    _.a
    .lz()
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
