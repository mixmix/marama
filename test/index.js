// run this from the terminal using :
// npx electro test/index.js

const { h } = require('mutant')

const Marama = require('../')
require('../lib/styles-inject')()

const page = h('div',
  {
    style: {
      margin: '4rem'
    }
  },
  Marama()
)

document.body.appendChild(page)
