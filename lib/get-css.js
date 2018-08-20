const compile = require('micro-css')
const getMCSS = require('./get-mcss')

module.exports = function getCSS () {
  return compile(getMCSS())
}
