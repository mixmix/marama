const getCSS = require('./styles-compile')
const fs = require('fs')
const { join } = require('path')

function stylesWrite () {
  fs.writeFile(join(__dirname, '../marama.css'), getCSS(), (err, done) => {
    if (err) throw err
    console.log('mcss built')
  })
}

module.exports = stylesWrite

if (!module.parent) stylesWrite()
