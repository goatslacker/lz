exports.head = function (lz, assert) {
  assert.equal([1, 2].lz().head(), 1)
}

exports.last = function (lz, assert) {
  assert.equal([1, 2].lz().last(), 2)
}
