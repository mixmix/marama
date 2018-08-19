const { h } = require('mutant')
const getCSS = require('./styles-compile')

module.exports = () => {
  getCSS((err, css) => {
    if (err) return console.error(err)

    document.head.appendChild(
      h('style', { innerHTML: css })
    )
  })
}
