var lz = require('./')
var lo = require('lodash')

var a = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29]

/*
console.log(
a
.lz()
.filter(function (n) {
  return n % 2 === 0
})
.drop(5)
.map(function (n) {
  console.log('----->', n);
  // TODO wtf
  return n * n
})
.head()
)
*/

/*
var b = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]

console.log(
b
.lz()
.filter(function (n) {
  return n % 2 === 0
})
.map(function (n) {
//  console.log('>', n);
  // TODO wtf
  return n * n
})
.head()
)

console.log(
lz(a)
.map(function (x) { return x * 10 })
.filter(function (x) { return x === 200 })
.all()
//.head()
)
*/
var arr = [1,2,3,4,5,6]
console.log(
arr
.lz()
.filter(function (n) { return n % 2 === 0 })
.map(function (n) { return n * n })
.filter(function (n) { return n > 20 })
.head()
)

console.log(
[1, 2, 'false', 5].lz()
.filter(function (n) {
  return n === 'false'
})
.take(3)
.$()
)

console.log(
lo.filter([1, 2, 'false', 5], function (n) { return n === 'false' }))
