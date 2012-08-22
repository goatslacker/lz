var lz = require('../')
var assert = require('assert')

var fs = require('fs')
var path = require('path')

var lists = require('./lists')

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: \\

var Suites = {
  rx: /-test\.js$/,

  green: function (str) {
    return '\u001b[32m' + str + '\u001b[39m'
  },

  red: function (str) {
    return '\u001b[31m' + str + '\u001b[39m'
  },

  run: function (suites) {
    var start = Date.now()
    var _ = this
    var color = 'green'
    suites.forEach(function (file) {
      var tests
      if (!(_.rx.test(file))) {
        return
      }
      tests = require(path.join(__dirname, file))
      fileName = file.replace(_.rx, '')
      console.log('\n' + fileName, '::')
      Object.keys(tests).forEach(function (test) {
        try {
          tests[test](lz, assert, lists)
        } catch (e) {
          color = 'red'
          console.error('\t', _.red(test), 'ø')
          console.error(e)
          return
        }
        console.log('\t', _.green(test), '√')
      })
    })
    console.log(_[color]('\nDone!'))
    console.log('Time ' + (Date.now() - start) + 'ms')
  }
}

if (process.argv.length > 2) {
  Suites.run(process.argv.slice(2))
} else {
  Suites.run(fs.readdirSync(__dirname))
}
