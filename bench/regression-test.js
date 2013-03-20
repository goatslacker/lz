var bench = require('bench')
var data = require('./_data')
var di = require('dependency-injector')
var https = require('https')
var lz = require('../')
var vm = require('vm')

var depsNew = new di({
  lz: lz,
  data: data,
  lazy: new lz(data.a),
  eq: function (a, b) { return a === b },
  even: function (n) { return n % 2 === 0 },
  lt_five: function (n) { return n < 5 },
  sqr: function (n) { return n * n },
  sum: function (a, b) { return a + b }
})

var depsOld = depsNew.clone()

var uri = {
  host: 'raw.github.com',
  path: '/goatslacker/lz/master/lz.js'
}

https.get(uri, function (res) {
  var code = ''
  res.setEncoding('utf8')
  res.on('data', function (chunk) {
    code += String(chunk)
  })
  res.on('end', function () {
    var context = {}
    vm.runInNewContext(code, context)

    depsOld.register({
      lz: context.lz,
      lazy: new context.lz(data.a)
    })

    run()
  })
})


function runTests(benchmarks) {
  var suite = benchmarks.shift()

  if (!suite) {
    return
  }

  console.log('Starting', suite[0])

  bench.compare(suite[1], null, null, null, function (err, result) {
    if (err) {
      throw err
    }
    bench.show(result)
    runTests(benchmarks)
  })
}

function compare(tests) {
  var benchmarks = Object.keys(tests).map(function (name) {
    var benchmark = tests[name]
    var fn = benchmark

    if (Array.isArray(benchmark)) {
      fn = new Function(
        'lazy',
        'return ' + new Function('lazy.' + name + '(' + benchmark + ')')
      )
    }

    return [name, {
      'new': depsNew.inject(fn),
      'old': depsOld.inject(fn),
    }]
  })

  runTests(benchmarks)
}

function run() {
  compare({
    any: [function (n) { return n === 5 }],

    elem: [5],

    filter: function (lz, data, even) {
      var lazy = new lz(data.b)
      return function () {
        return lazy.filter(even).head()
      }
    },

    flatten: function (lz) {
      var raisedArr = [1, [2, [3, 4], 5, [6, 7], 8], 9, 10]
      return function () {
        return lz.flatten(raisedArr)
      }
    },

    foldl_static: function (lz, sum) {
      return function () {
        // XXX add these functions to DI
        return lz.foldl(sum, data)
      }
    },

    foldl: [function (a, b) { return a + b }],

    head: [],

    init: function (lazy) {
      return function () {
        return lazy.init().$()
      }
    },

    last: function (lazy, even) {
      return function () {
        return lazy.filter(even).last()
      }
    },

    map: function (lazy, sqr) {
      return function () {
        return lazy.map(sqr).take(5).$()
      }
    },

    max: [],

    min: [],

    range: function (lz, even) {
      return function () {
        return lz.range(1, 9).filter(even).head()
      }
    },

    tail: function (lazy) {
      return function () {
        return lazy.tail().$()
      }
    },

    takeWhile: function (lazy, lt_five) {
      return function () {
        return lazy.takeWhile(lt_five).$()
      }
    },

    zipWithAnd: function (lz, eq) {
      var mirrorArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      var yarraRorrim = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

      return function () {
        return lz
          .zipWith(eq, mirrorArray, yarraRorrim)
          .and()
      }
    },
  })
}
