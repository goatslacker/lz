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

  function _n() {
    var _this = this
    if (_this._p) _this._p(_this._i)
    var item = _this._l[_this._i++]
    if (_this._i > _this.length) return UNDEFINED
    for (var j = 0; j < _this._f.length; j += 1) {
      item = _this._f[j](item)
      if (item === FALSE) return _this._n()
    }
    return item
  }

  function _p(list, x) {
    return typeof list === 'string'
      ? list.concat(x)
      : (list.push(x), list)
  }

  function lz(list) {
    var _this = this
    if (!(_this instanceof lz)) {
      return new lz(list)
    }

    _this._f = []
    _this._i = 0
    _this._l = list

    _this.length = list.length
  }

  Object.defineProperty(Array.prototype, 'lz', {
    value: function () { return new lz(this) }
  })

  var lz_prototype = lz.prototype

  // reset the counter so there are no "side effects"
  // example:
  // var z = new lz([1, 2, 3])
  // calling z.head() will always produce 1
  lz_prototype._r = function (value) {
    this._i = 0
    return value
  }

  lz_prototype._n = _n

  // Prototype

  lz_prototype.compact = function () {
    var _this = this
    _this._v = null
    _this._f.push(function (x) {
      if (!x) return FALSE
      return x
    })
    return _this
  }

  lz_prototype.concat = function (arr) {
    var _this = this
    var length = _this.length
    _this.length += arr.length

    if (arr instanceof lz) {
      _this._f.push(function (x) {
        if (_this._i > length) {
          x = arr._n()
          _this._l = _p(_this._l, x)
        }
        return x
      })
    } else {
      _this._f.push(function (x) {
        if (_this._i > length) {
          x = arr[_this._i - length - 1]
          _this._l = _p(_this._l, x)
        }
        return x
      })
    }

    return _this
  }

  lz_prototype.cycle = function () {
    return lz.cycle(this._l)
  }

  lz_prototype.drop = function (n) {
    var _this = this
    _this._v = null
    var item

    while (n-- > 0) {
      item = _this._n()
      if (item === UNDEFINED) {
        _this._v = []
        return _this
      }
    }

    _this._l = _this._l.slice(_this._i)

    // partial reset
    _this._i = 0
    _this.length = _this._l.length

    return _this
  }

  lz_prototype.dropWhile = function (fn) {
    var _this = this
    _this._v = null
    var item

    while (true) {
      item = _this._n()
      if (item === UNDEFINED) {
        _this._v = []
        return _this
      }
      if (fn(item) === false) break
    }

    _this._l = _this._l.slice(_this._i - 1)

    // partial reset
    _this._i = 0
    _this.length = _this._l.length

    return _this
  }

  lz_prototype.filter = function (f) {
    var _this = this
    _this._v = null
    _this._f.push(function (x) {
      if (f(x) === true) return x
      else return FALSE
    })
    return _this
  }

  lz_prototype.flatten = function (shallow) {
    return lz.flatten(this.$(), shallow)
  }

  lz_prototype.init = function () {
    var _this = this
    var results = []
    var item
    var n = _this.length

    while (--n > 0) {
      item = _this._n()
      if (item === UNDEFINED) break
      results.push(item)
    }

    _this._l = _this._v = results

    // reset
    _this._f = []
    _this._i = 0
    _this.length = _this._l.length

    return _this
  }

  lz_prototype.map = function (f) {
    var _this = this
    _this._v = null
    _this._f.push(function (x) { return f(x) })
    return _this
  }

  lz_prototype.of = function (b) {
    return new lz(b)
  }

  lz_prototype.scanl = function (fn) {
    var _this = this
    _this._v = null
    var prev
    _this._f.push(function (x) { return (prev = fn(prev, x) || x) })
    return _this
  }

  lz_prototype.sort = function (fn) {
    var _this = this
    _this._v = _this._l = Array.prototype.sort.call(_this._l, fn)
    return _this
  }

  lz_prototype.tail = function () {
    var _this = this
    var results = []
    var item
    var n = _this.length

    _this._n()

    while (--n > 0) {
      item = _this._n()
      if (item === UNDEFINED) break
      results.push(item)
    }

    _this._l = _this._v = results

    // reset
    _this._f = []
    _this._i = 0
    _this.length = _this._l.length

    return _this
  }

  lz_prototype.take = function (n) {
    var _this = this
    var results = []
    var item

    while (n-- > 0) {
      item = _this._n()
      if (item === UNDEFINED) break
      results.push(item)
    }

    _this._l = _this._v = results

    // reset
    _this._f = []
    _this._i = 0
    _this.length = _this._l.length

    return _this
  }

  lz_prototype.takeWhile = function (fn) {
    var _this = this
    var results = []
    var result
    var item

    while (true) {
      item = _this._n()
      if (item === UNDEFINED) break
      result = fn(item)
      if (result === true) results.push(item)
      else break
    }

    _this._l = _this._v = results

    // reset
    _this._f = []
    _this._i = 0
    _this.length = _this._l.length

    return _this
  }

  lz_prototype.empty = function () {
    return new lz([])
  }

  lz_prototype.zipWith = function (fn, list) {
    return lz.zipWith(fn, list, this._l)
  }

  // Values

  lz_prototype.all = function (fn) {
    var _this = this
    var item
    var i = _this.length

    while (i-- > 0) {
      item = _this._n()
      if (item === UNDEFINED) break
      if (fn(item) === false) return _this._r(false)
    }

    return _this._r(true)
  }

  lz_prototype.and = function () {
    var _this = this
    var item
    var i = _this.length

    while (i-- > 0) {
      item = _this._n()
      if (item === UNDEFINED) break
      if (!item) return _this._r(false)
    }

    return _this._r(true)
  }

  lz_prototype.any = function (fn) {
    var _this = this
    var item
    var i = _this.length

    while (i-- > 0) {
      item = _this._n()
      if (item === UNDEFINED) break
      if (fn(item) === true) return _this._r(true)
    }

    return _this._r(false)
  }

  lz_prototype.at = function (n) {
    var _this = this
    n = n < 0 ? _this.length + n : n
    if (n < 0) return _this._r(null)

    while (--n >= 0) {
      if (_this._n() === UNDEFINED) return _this._r(null)
    }

    var item = _this._n()
    return _this._r(item === UNDEFINED ? null : item)
  }

  lz_prototype.chain = function (f) {
    var _this = this
    if (typeof f !== 'function') {
      throw new TypeError('Chain argument must be a function')
    }
    var result = f(_this._v || _this._l)
    if (result instanceof lz) {
      return result
    } else {
      return new lz(result.length ? result : [result])
    }
  }

  lz_prototype.foldl = function (fn) {
    var _this = this
    var result, next
    var i = _this.length

    result = _this._n()
    if (result === UNDEFINED) return _this._r(null)

    while (i-- > 0) {
      next = _this._n()
      if (next === UNDEFINED) break
      result = fn(result, next)
    }

    return _this._r(result)
  }

  lz_prototype.elem = function (x) {
    var _this = this
    var item
    var i = _this.length
    var notANumber = isNaN(x)

    while (i-- > 0) {
      item = _this._n()
      if (item === UNDEFINED) break

      if (item === x) {
        return _this._r(x !== 0 || 1 / x === 1 / item)
      } else if (notANumber && x !== x && item !== item) {
        return _this._r(true)
      }
    }

    return _this._r(false)
  }

  lz_prototype.head = function () {
    var _this = this
    var item = _this._n()
    return _this._r(item === UNDEFINED ? null : item)
  }

  lz_prototype.last = function () {
    var _this = this
    var n = -1
    var result
    var item

    while (++n < _this.length) {
      item = _this._n()
      if (item === UNDEFINED) break
      result = item
    }

    return _this._r(result)
  }

  lz_prototype.nil = function () {
    var _this = this
    var item
    if (_this.length === 0) return _this._r(true)
    var i = _this.length

    while (i-- > 0) {
      item = _this._n()
      if (item === UNDEFINED) break
      if (item != null) return _this._r(false)
    }

    return _this._r(true)
  }

  lz_prototype.max = function (fn) {
    return lz.max(this.$(), fn)
  }

  lz_prototype.min = function (fn) {
    return lz.min(this.$(), fn)
  }

  lz_prototype.or = function () {
    var _this = this
    var item
    var i = _this.length

    while (i-- > 0) {
      item = _this._n()
      if (item === UNDEFINED) break
      if (!!item) return _this._r(true)
    }

    return _this._r(false)
  }

  lz_prototype.$ = lz_prototype.toArray = function () {
    var _this = this
    if (_this._v) {
      return _this._v
    }

    var results = []
    var item
    var n = _this.length

    while (n > 0) {
      item = _this._n()
      if (item === UNDEFINED) break
      results.push(item)
      n -= 1
    }

    // reset
    _this._v = results
    _this._f = []
    _this._i = 0

    return results
  }

  lz_prototype.toString = function (joinBy) {
    var _this = this
    if (typeof joinBy !== 'string') {
      joinBy = ''
    }

    if (_this._v) {
      return typeof _this._v === 'string'
        ? _this._v
        : _this._v.join(joinBy)
    }

    var result = ''
    var item, next

    while (true) {
      item = _this._n()
      if (item === UNDEFINED) break
      result += item
      next = _this._n()
      if (next === UNDEFINED) break
      result += joinBy + next
    }

    // reset
    _this._v = result
    _this._f = []
    _this._i = 0

    return result
  }

  // @value XXX
  lz_prototype.unlines = function () {
    var _this = this
    var result = ''
    var item, next

    while (true) {
      item = _this._n()
      if (item === UNDEFINED) break
      result += item
      next = _this._n()
      if (next === UNDEFINED) break
      result += '\n' + next
    }

    return result
  }

  // @value XXX
  lz_prototype.unwords = function () {
    var _this = this
    var result = ''
    var item, next

    while (true) {
      item = _this._n()
      if (item === UNDEFINED) break
      result += item
      next = _this._n()
      if (next === UNDEFINED) break
      result += ' ' + next
    }

    return result
  }

  // Static

  lz.concatMap = function (fn, coll) {
    var l = coll.length
    var i = -1
    var results = []

    while (++i < l) {
      results.push.apply(results, fn(coll[i]))
    }

    var instance = new lz(results)
    instance._v = results

    return instance
  }

  lz.cycle = function (list) {
    var z = new lz(list)
    var length = list.length
    z.length = Infinity
    z._n = function () {
      if (this._i === length) {
        this._i = 0
      }
      return _n.call(this)
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

      value = arr._n()
      if (value === UNDEFINED) return null

      while (index-- > 0) {
        item = arr._n()
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
    z._n = function () {
      result = fn(result) || n
      this._l.push(result)
      return _n.call(this)
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

  lz.of = function (b) {
    return new lz(b)
  }

  lz.range = function (start, end) {
    var z = new lz([])
    z.length = end
    z._p = function (i) { this._l[i] = i + start }
    return z
  }

  lz.repeat = function (n) {
    var z = new lz([])
    z.length = Infinity
    z._n = function () {
      this._l.push(n)
      return _n.call(this)
    }
    return z
  }

  lz.replicate = function (times, n) {
    var z = new lz([])
    z.length = times
    z._p = function (i) { this._l[i] = n }
    return z
  }

  lz.words = function (str) {
    return new lz(str.split(' '))
  }

  lz.empty = function () {
    return new lz([])
  }

  lz.zipWith = function (fn, list1, list2) {
    var z = new lz([])
    z.length = list1.length < list2.length ? list1.length : list2.length

    if (!(list1 instanceof lz) && !(list2 instanceof lz)) {
      z._n = function () {
        if (this._i >= this.length) return UNDEFINED
        return fn(list1[this._i], list2[this._i++])
      }
      return z
    } else {
      if (!(list1 instanceof lz)) list1 = lz(list1)
      if (!(list2 instanceof lz)) list2 = lz(list2)
      z._n = function () {
        this._l.push(fn(list1._n(), list2._n()))
        return _n.call(this)
      }
      return z
    }
  }

  // Extras

  lz.flip = function (a, b) { return b }

  lz.identity = function (a) { return a }

  lz.not = function (b) { return !b }


  if (typeof module !== 'undefined') {
    module.exports = lz
  } else {
    exports.lz = lz
  }
}(this));
