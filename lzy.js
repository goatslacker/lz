'use strict'

var UNDEFINED = {}

function next(gen) {
  let result = gen.next()

  return result.done
    ? UNDEFINED
    : result.value
}

function* filter(f, arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let val = arr[i]
    if (f(val) === true) {
      yield val
    }
  }
}

function* map(f, arr) {
  for (let i = 0; i < arr.length; i += 1) {
    yield f(arr[i])
  }
}

function head(gen) {
  return next(gen)
}

function take(n, gen) {
  var arr = []
  for (let i = 0; i < n; i += 1) {
    let val = next(gen)
    if (val === UNDEFINED) return arr
    arr.push(val)
  }
  return arr
}

var lz = {
  filter: filter,
  map: map,
  head: head,
  take: take
}

module.exports = lz
