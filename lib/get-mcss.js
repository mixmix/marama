const readDir = require('read-directory')
const { join } = require('path')

module.exports = function getMcss (cb) {
  const collection = readDir.sync(join(__dirname, '../styles'))

  return values(collection).reverse().join('\n\n')
}

function values (obj) {
  return Object.keys(obj)
    .map(key => obj[key])
}
