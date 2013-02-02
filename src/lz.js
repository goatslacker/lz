(function (exports) {
/*jshint
  asi: true,
  boss: true,
  camelcase: false,
  curly: false,
  eqnull: true,
  newcap: false,
  node: true,
  plusplus: false,
  validthis: true
*/
  'use strict';

  var UNDEFINED = {}
  var FALSE = {}

  function lz(list) {
    if (!(this instanceof lz)) {
      return new lz(list)
    }

    this._fn = []
    this._i = 0
    this._list = list

    this.length = list.length
  }

  Object.defineProperty(Array.prototype, 'lz', {
    value: function () { return new lz(this) }
  })

  var lz_prototype = lz.prototype

  lz_prototype.$ = lz_prototype.toArray = function () {
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

  lz_prototype.toString = function (joinBy) {
    if (typeof joinBy !== 'string') {
      joinBy = ''
    }

    if (this._value) {
      return this._value.join(joinBy)
    }

    var result = ''
    var item, next

    while (true) {
      item = this.next()
      if (item === UNDEFINED) break
      result += item
      next = this.next()
      if (next === UNDEFINED) break
      result += joinBy + next
    }

    this._value = result

    return result
  }

  lz_prototype.compact = function () {
    this._value = null
    this._fn.push(function (x) {
      if (!x) return FALSE
      return x
    })
    return this
  }

  lz_prototype.concat = function (arr) {
    var length = this.length
    this.length += arr.length

    if (arr instanceof lz) {
      this._fn.push(function (x) {
        if (this._i > length) {
          x = arr.next()
          this._list.push(x)
        }
        return x
      }.bind(this))
    } else {
      this._fn.push(function (x) {
        if (this._i > length) {
          x = arr[this._i - length - 1]
          this._list.push(x)
        }
        return x
      }.bind(this))
    }

    return this
  }

  lz_prototype.cycle = function () {
    return lz.cycle(this._list)
  }

  lz_prototype.drop = function (n) {
    this._value = null
    var item

    while (n-- > 0) {
      item = this.next()
      if (item === UNDEFINED) {
        this._value = []
        return this
      }
    }

    this._list = this._list.slice(this._i)

    // partial reset
    this._i = 0
    this.length = this._list.length

    return this
  }

  lz_prototype.dropWhile = function (fn) {
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

    this._list = this._list.slice(this._i - 1)

    // partial reset
    this._i = 0
    this.length = this._list.length

    return this
  }

  lz_prototype.filter = function (f) {
    this._value = null
    this._fn.push(function (x) {
      if (f(x) === true) return x
      else return FALSE
    })
    return this
  }

  lz_prototype.init = function () {
    var results = []
    var item
    var n = this.length

    while (--n > 0) {
      item = this.next()
      if (item === UNDEFINED) break
      results.push(item)
    }

    this._list = this._value = results

    // reset
    this._fn = []
    this._i = 0
    this.length = this._list.length

    return this
  }

  lz_prototype.map = function (f) {
    this._value = null
    this._fn.push(function (x) { return f(x) })
    return this
  }

  lz_prototype.next = function () {
    if (this.pre) this.pre(this._i)
    var item = this._list[this._i++]
    if (this._i > this.length) return UNDEFINED
    for (var j = 0; j < this._fn.length; j += 1) {
      item = this._fn[j](item)
      if (item === FALSE) return this.next()
    }
    return item
  }

  lz_prototype.scanl = function (fn) {
    this._value = null
    var prev
    this._fn.push(function (x) { return (prev = fn(prev, x) || x) })
    return this
  }

  lz_prototype.sort = function (fn) {
    this._value = this._list = Array.prototype.sort.call(this._list, fn)
    return this
  }

  lz_prototype.splitWith = function (fn) {
    return new lz(lz.splitWith(fn, this._list))
  }

  lz_prototype.tail = function () {
    var results = []
    var item
    var n = this.length

    this.next()

    while (--n > 0) {
      item = this.next()
      if (item === UNDEFINED) break
      results.push(item)
    }

    this._list = this._value = results

    // reset
    this._fn = []
    this._i = 0
    this.length = this._list.length

    return this
  }

  lz_prototype.take = function (n) {
    var results = []
    var item

    while (n-- > 0) {
      item = this.next()
      if (item === UNDEFINED) break
      results.push(item)
    }

    this._list = this._value = results

    // reset
    this._fn = []
    this._i = 0
    this.length = this._list.length

    return this
  }

  lz_prototype.takeWhile = function (fn) {
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

    this._list = this._value = results

    // reset
    this._fn = []
    this._i = 0
    this.length = this._list.length

    return this
  }

  lz_prototype.zipWith = function (fn, list) {
    return lz.zipWith(fn, list, this._list)
  }


  // @value
  lz_prototype.and = function () {
    var item
    var i = this.length

    while (i-- > 0) {
      item = this.next()
      if (item === UNDEFINED) break
      if (!item) return false
    }

    return true
  }

  // @value
  lz_prototype.all = function (fn) {
    var item
    var i = this.length

    while (i-- > 0) {
      item = this.next()
      if (item === UNDEFINED) break
      if (fn(item) === false) return false
    }

    return true
  }

  // @value
  lz_prototype.any = function (fn) {
    var item
    var i = this.length

    while (i-- > 0) {
      item = this.next()
      if (item === UNDEFINED) break
      if (fn(item) === true) return true
    }

    return false
  }

  lz_prototype.at = function (n) {
    while (--n > 1) {
      if (this.next() === UNDEFINED) return null
    }

    var item
    return (item = this.next()) === UNDEFINED ? null : item
  }

  lz_prototype.flatten = function (shallow) {
    return lz.flatten(this.$(), shallow)
  }

  // @value
  lz_prototype.foldl = function (fn) {
    var result, next
    var i = this.length

    result = this.next()
    if (result === UNDEFINED) return null

    while (i-- > 0) {
      next = this.next()
      if (next === UNDEFINED) break
      result = fn(result, next)
    }
    return result
  }

  // @value
  lz_prototype.elem = function (x) {
    var item
    var i = this.length

    while (i-- > 0) {
      item = this.next()
      if (item === UNDEFINED) break
      if (item === x) return true
    }

    return false
  }

  // @value
  lz_prototype.head = function () {
    var item
    return (item = this.next()) === UNDEFINED ? null : item
  }

  // @value
  lz_prototype.last = function () {
    var n = -1
    var result
    var item
    while (++n < this.length) {
      item = this.next()
      if (item === UNDEFINED) break
      result = item
    }
    return result
  }


  lz_prototype.nil = function () {
    var item
    if (this.length === 0) return true
    var i = this.length

    while (i-- > 0) {
      item = this.next()
      if (item === UNDEFINED) break
      if (item != null) return false
    }

    return true
  }

  lz_prototype.max = function (fn) {
    return lz.max(this.$(), fn)
  }

  lz_prototype.min = function (fn) {
    return lz.min(this.$(), fn)
  }

  // @value
  lz_prototype.notElem = function (n) {
    var item
    var i = this.length

    while (i-- > 0) {
      item = this.next()
      if (item === UNDEFINED) break
      if (item === n) return false
    }
    return true
  }

  // @value
  lz_prototype.or = function () {
    var item
    var i = this.length

    while (i-- > 0) {
      item = this.next()
      if (item === UNDEFINED) break
      if (!!item) return true
    }

    return false
  }

  // @value XXX
  lz_prototype.unlines = function () {
    var result = ''
    var item, next

    while (true) {
      item = this.next()
      if (item === UNDEFINED) break
      result += item
      next = this.next()
      if (next === UNDEFINED) break
      result += '\n' + next
    }

    return result
  }

  // @value XXX
  lz_prototype.unwords = function () {
    var result = ''
    var item, next

    while (true) {
      item = this.next()
      if (item === UNDEFINED) break
      result += item
      next = this.next()
      if (next === UNDEFINED) break
      result += ' ' + next
    }

    return result
  }


  lz.concatMap = function (fn, coll) {
    var l = coll.length
    var i = -1
    var results = []

    while (++i < l) {
      results.push.apply(results, fn(coll[i]))
    }

    return results
  }

  lz.cycle = function (list) {
    var z = new lz(list)
    var length = list.length
    z.length = Infinity
    z._next = z.next
    z.next = function () {
      if (this._i === length) {
        this._i = 0
      }
      return this._next()
    }
    return z
  }

  lz.flatten = function (arr, shallow) {
    var result = []
    if (!arr) return result
    var value, index = -1, length = arr.length

    while (++index < length) {
      value = arr[index]
      if (Array.isArray(value))
        result.push.apply(result, shallow ? value : lz.flatten(value))
      else result.push(value)
    }

    return result
  }

  lz.foldl = function (fn, arr) {
    if (!arr) return null
    var item, value = arr[0], index = 0, length = arr.length

    if (arr instanceof lz) {
      index = arr.length

      value = arr.next()
      if (value === UNDEFINED) return null

      while (index-- > 0) {
        item = arr.next()
        if (item === UNDEFINED) break
        value = fn(value, item)
      }
    } else {
      while (++index < length) {
        value = fn(value, arr[index])
      }
    }

    return value
  }

  lz.iterate = function (fn, n) {
    var z = new lz([])
    var result
    z.length = Infinity
    z._next = z.next
    z.next = function () {
      result = fn(result) || n
      this._list.push(result)
      return this._next()
    }
    return z
  }

  lz.lines = function (str) {
    return new lz(str.split('\n'))
  }

  lz.max = function (arr, fn) {
    if (!arr) return null
    var item, value = -Infinity, index = -1, length = arr.length

    if (fn) {
      while (++index < length) {
        item = fn(arr[index])
        if (item > value) value = item
      }
    } else {
      while (++index < length) {
        item = arr[index]
        if (item > value) value = item
      }
    }

    return value
  }

  lz.min = function (arr, fn) {
    if (!arr) return null
    var item, value = Infinity, index = -1, length = arr.length

    if (fn) {
      while (++index < length) {
        item = fn(arr[index])
        if (item < value) value = item
      }
    } else {
      while (++index < length) {
        item = arr[index]
        if (item < value) value = item
      }
    }

    return value
  }

  lz.range = function (start, end) {
    var z = new lz([])
    z.length = end
    z.pre = function (i) { this._list[i] = i + start }
    return z
  }

  lz.repeat = function (n) {
    var z = new lz([])
    z.length = Infinity
    z._next = z.next
    z.next = function () {
      this._list.push(n)
      return this._next()
    }
    return z
  }

  lz.replicate = function (times, n) {
    var z = new lz([])
    z.length = times
    z.pre = function (i) { this._list[i] = n }
    return z
  }

  lz.splitWith = function (fn, coll) {
    var l = coll.length
    var i = -1
    var results = []

    while (++i < l) {
      if (!fn(coll[i])) {
        break
      }
      results.push(coll[i])
    }

    return [results, coll.slice(i)]
  }

  lz.words = function (str) {
    return new lz(str.split(' '))
  }

  lz.zipWith = function (fn, list1, list2) {
    var z = new lz([])
    z.length = list1.length < list2.length ? list1.length : list2.length

    if (!(list1 instanceof lz) && !(list2 instanceof lz)) {
      z.next = function () {
        if (this._i >= this.length) return UNDEFINED
        return fn(list1[this._i], list2[this._i++])
      }
      return z
    } else {
      if (!(list1 instanceof lz)) list1 = lz(list1)
      if (!(list2 instanceof lz)) list2 = lz(list2)
      z._next = z.next
      z.next = function () {
        this._list.push(fn(list1.next(), list2.next()))
        return this._next()
      }
      return z
    }
  }

  // extras
  lz.fp = {}
  lz.fp.flip = function (a, b) { return b }
  lz.fp.identity = function (a) { return a }
  lz.fp.not = function (b) { return !b }
  lz.fp.curry = function (fn) {
    if (fn.length < 1) {
      return fn
    }
    return function (arg) {
      if (arg == null) arg = []

      return function (a) {
        var xargs = arg.concat(a)
        if (xargs.length < fn.length) return lz.fp.curry(fn)
        else fn.apply(fn, xargs)
      }
    }
  }

  if (typeof module !== 'undefined') {
    module.exports = lz
  } else {
    exports.lz = lz
  }
}(this));
