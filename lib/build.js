const compile = require('micro-css')
const fs = require('fs')
const { join } = require('path')

fs.readFile(join(__dirname, '../index.mcss'), 'utf8', (err, mcss) => {
  if (err) throw err

  const css = compile(mcss)
  fs.writeFile(join(__dirname, '../index.css'), css, (err, done) => {
    if (err) throw err
    console.log('mcss compiled')
  })
})
