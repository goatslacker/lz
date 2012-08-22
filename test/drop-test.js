exports.drop = function (lz, assert) {
  assert.deepEqual(
    [1, 2, 3].lz().drop(2),
    [3]
  )

  assert.deepEqual(
    [1, 2, 3].lz().drop(2).lz().head(),
    3
  )
}
