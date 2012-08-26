/*jshint asi: true */
var UNDEFINED = {}
var FALSE = {}

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
})

lz.prototype.$ = lz.prototype.toArray = function () {
  if (this._value) {
    return this._value
  }

  var results = []
  var item
  var n = this.length

  while (n > 0) {
    item = this.next()
    if (item === UNDEFINED) break
    results.push(item)
    n -= 1
  }

  this._value = results

  return results
}

lz.prototype.cycle = function () {
  return lz.cycle(this.list)
}

lz.prototype.drop = function (n) {
  this._value = null
  var item

  while (n > 0) {
    item = this.next()
    if (item === UNDEFINED) {
      this._value = []
      return this
    }
    n -= 1
  }

  this.list = this.list.slice(this.i)

  // partial reset
  this.i = 0
  this.length = this.list.length

  return this
}

lz.prototype.dropWhile = function (fn) {
  this._value = null
  var item

  while (true) {
    item = this.next()
    if (item === UNDEFINED) {
      this._value = []
      return this
    }
    if (fn(item) === false) break
  }

  this.list = this.list.slice(this.i - 1)

  // partial reset
  this.i = 0
  this.length = this.list.length

  return this
}

lz.prototype.filter = function (f) {
  this._value = null
  this.fn.push(function (x) {
    if (f(x) === true) return x
    else return FALSE
  })
  return this
}

lz.prototype.init = function () {
  var results = []
  var item
  var n = this.length

  while (n > 0) {
    item = this.next()
    if (item === UNDEFINED) break
    results.push(item)
    n -= 1
  }

  results.pop()

  this.list = this._value = results

  // reset
  this.fn = []
  this.i = 0
  this.length = this.list.length

  return this
}

lz.prototype.map = function (f) {
  this._value = null
  this.fn.push(function (x) { return f(x) })
  return this
}

lz.prototype.next = function () {
  var item = this.list[this.i++]
  if (this.i > this.length) return UNDEFINED
  for (var j = 0; j < this.fn.length; j += 1) {
    item = this.fn[j](item)
    if (item === FALSE) return this.next()
  }
  return item
}

lz.prototype.prev = function () {
  var item = this.list[--this.i]
  if (this.i === -1) return UNDEFINED
  for (var j = 0; j < this.fn.length; j += 1) {
    item = this.fn[j](item)
    if (item === FALSE) return this.prev()
  }
  return item
}

lz.prototype.scanl = function (fn) {
  this._value = null
  var prev
  this.fn.push(function (x) { return (prev = fn(prev, x) || x) })
  return this
}

lz.prototype.tail = function () {
  var results = []
  var item
  var n = this.length

  while (n > 0) {
    item = this.next()
    if (item === UNDEFINED) break
    results.push(item)
    n -= 1
  }

  results.shift()

  this.list = this._value = results

  // reset
  this.fn = []
  this.i = 0
  this.length = this.list.length

  return this
}

lz.prototype.take = function (n) {
  var results = []
  var item

  while (n > 0) {
    item = this.next()
    if (item === UNDEFINED) break
    results.push(item)
    n -= 1
  }

  this.list = this._value = results

  // reset
  this.fn = []
  this.i = 0
  this.length = this.list.length

  return this
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

  this.list = this._value = results

  // reset
  this.fn = []
  this.i = 0
  this.length = this.list.length

  return this
}

lz.prototype.zipWith = function (fn, list) {
  return lz.zipWith(fn, list, this.list)
}


// @value
lz.prototype.and = function () {
  var item

  while (true) {
    item = this.next()
    if (item === false) return false
    if (item === UNDEFINED) break
  }

  return true
}

// @value
lz.prototype.all = function (fn) {
  var item

  while (true) {
    item = this.next()
    if (fn(item) === false) return false
    if (item === UNDEFINED) break
  }

  return true
}

// @value
lz.prototype.any = function (fn) {
  var item

  while (true) {
    item = this.next()
    if (fn(item) === true) return true
    if (item === UNDEFINED) break
  }

  return false
}

// @value
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

// @value
lz.prototype.elem = function (n) {
  var item
  while (true) {
    item = this.next()
    if (item === UNDEFINED) break
    if (item === n) return true
  }
  return false
}

// @value
lz.prototype.head = function () {
  var item
  return (item = this.next()) === UNDEFINED ? null : item
}

// @value
lz.prototype.last = function () {
  var item
  this.i = this.length
  return (item = this.prev()) === UNDEFINED ? null : item
}

// @value
lz.prototype.nil = function () {
  if (this.length === 0) return true

  while (true) {
    item = this.next()
    if (item != null) return false
    if (item === UNDEFINED) break
  }

  return true
}

// @value
lz.prototype.or = function () {
  var item

  while (true) {
    item = this.next()
    if (item === true) return true
    if (item === UNDEFINED) break
  }

  return false
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

lz.repeat = function (n) {
  var z = new lz([])
  z.length = Infinity
  z._next = z.next
  z.next = function () {
    this.list.push(n)
    return this._next()
  }
  return z
}

lz.replicate = function (times, n) {
  var z = new lz([])
  z.length = times
  z._next = z.next
  z.next = function () {
    this.list.push(n)
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
