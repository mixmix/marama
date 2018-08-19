const getCSS = require('./styles-compile')
const fs = require('fs')
const { join } = require('path')

function buildStyles () {
  getCSS((err, css) => {
    if (err) throw err

    fs.writeFile(join(__dirname, '../index.css'), css, (err, done) => {
      if (err) throw err
      console.log('mcss built')
    })
  })
}

module.exports = buildStyles

if (!module.parent) buildStyles()
