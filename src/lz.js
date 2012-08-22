var UNDEFINED = {}

function lz(list) {
  this.fn = []
  this.i = 0
  this.length = list.length

  this.list = list

  if (!(this instanceof lz)) {
    return new lz(list)
  }
}

Object.defineProperty(Array.prototype, 'lz', {
  value: function () {
    return new lz(this)
  },
  enumerable: false
});

lz.prototype.valueOf = function () {
  if (this._value) {
    return this._value
  }

  return this._value = this.all()
}

lz.prototype.next = function () {
  var item = this.list[this.i++]
  if (this.i > this.length) return UNDEFINED
  for (var j = 0; j < this.fn.length; j += 1) {
    item = this.fn[j](item)
  }
  return item
}

lz.prototype.filter = function (f) {
  var _ = this
  this.fn.push(function (x) {
    if (f(x) === true) return x
    else return _.next()
  })
  return this
}

lz.prototype.map = function (f) {
  this.fn.push(function (x) { return f(x) })
  return this
}

lz.prototype.head = function () {
  var item
  return (item = this.next()) === UNDEFINED ? null : item
}

lz.prototype.last = function () {
  var n = 0
  var item
  var result
  while (n < this.length) {
    item = this.next()
    if (item === UNDEFINED) break
    result = item
  }
  return result
}

lz.prototype.init = function () {
  return this.take(this.length - 1)
}

lz.prototype.tail = function () {
  var result = this.all()
  result.shift()
  return result
}

lz.prototype.foldl = function (fn) {
  var result, next
  result = this.next()
  if (result === UNDEFINED) return null
  while (true) {
    next = this.next()
    if (next === UNDEFINED) break
    result = fn(result, next)
  }
  return result
}

lz.prototype.has = function (n) {
  var item
  while (true) {
    item = this.next()
    if (item === UNDEFINED) break
    if (item === n) return true
  }
  return false
}

lz.prototype.takeWhile = function (fn) {
  var results = []
  var result
  var item

  while (true) {
    item = this.next()
    if (item === UNDEFINED) break
    result = fn(item)
    if (result === true) results.push(item)
    else break
  }

  return results
}

//lz.prototype.foldr
//lz.prototype.each ?
//lz.prototype.any
//lz.prototype.some
//lz.prototype.drop
//lz.prototype.dropWhile
//lz.prototype.reverse

//lz utils, not lazy but whatever. include lz.memoize, lz.flatten, etc.

lz.prototype.take = function (n) {
  var results = []
  var item
  while (n > 0) {
    item = this.next()
    if (item === UNDEFINED) break
    results.push(item)
    n -= 1
  }
  return results
}

lz.prototype.drop = function (n) {
  this.i = n
  var results = []
  var item
  n = 0
  while (n < this.length) {
    item = this.next()
    if (item === UNDEFINED) break
    results.push(item)
    n += 1
  }
  return results
}

lz.prototype.all = function () {
  var results = []
  var item
  var n = 0
  while (n < this.length) {
    item = this.next()
    if (item === UNDEFINED) break
    results.push(item)
    n += 1
  }
  return results
}

lz.prototype.zipWith = function (fn, list) {
  return lz.zipWith(fn, list, this.list)
}

lz.prototype.cycle = function () {
  return lz.cycle(this.list)
}

lz.range = function (start, end) {
  var i = new lz([])
  i.length = end
  i._next = i.next
  i.next = function () {
    this.list.push(this.i + start)
    return i._next()
  }
  return i
}

lz.cycle = function (list) {
  var z = new lz(list)
  var length = list.length
  z.length = Infinity
  z._next = z.next
  z.next = function () {
    if (this.i === length) {
      this.i = 0
    }
    return this._next()
  }
  return z
}

lz.zipWith = function (fn, list1, list2) {
  var z = new lz([])
  z.length = list1.length < list2.length ? list1.length : list2.length

  if (!(list1 instanceof lz) && !(list2 instanceof lz)) {
    z.next = function () {
      if (this.i >= this.length) return UNDEFINED
      return fn(list1[this.i], list2[this.i++])
    }
    return z
  } else {
    if (!(list1 instanceof lz)) list1 = lz(list1)
    if (!(list2 instanceof lz)) list2 = lz(list2)
    z._next = z.next
    z.next = function () {
      this.list.push(fn(list1.next(), list2.next()))
      return this._next()
    }
    return z
  }
}

module.exports = lz
