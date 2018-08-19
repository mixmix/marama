const readDir = require('read-directory')
const compile = require('micro-css')
const { join } = require('path')

module.exports = function compileStyles (cb) {
  readDir(join(__dirname, '../styles'), (err, files) => {
    if (err) return cb(err)

    const mcss = values(files).join('\n\n')

    console.log(compile(mcss))

    cb(null, compile(mcss))
  })
}

function values (obj) {
  return Object.keys(obj)
    .map(key => obj[key])
}
