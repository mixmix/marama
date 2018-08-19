const compile = require('micro-css')
const fs = require('fs')
const { join } = require('path')

function compileStyles (cb) {
  fs.readFile(join(__dirname, '../index.mcss'), 'utf8', (err, mcss) => {
    if (err) return cb(err)

    cb(null, compile(mcss))
  })
}

module.exports = compileStyles
