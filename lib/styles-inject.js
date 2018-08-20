const { h } = require('mutant')
const getCSS = require('./get-css')

module.exports = () => {
  document.head.appendChild(
    h('style', { innerHTML: getCSS() })
  )
}
