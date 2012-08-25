var Benchmark = new (require('benchmark')).Suite

module.exports = function (tests) {
  Object.keys(tests).forEach(function (name) {
    Benchmark.add(name, tests[name])
  })

  Benchmark
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'))
  })
  .run()
}
