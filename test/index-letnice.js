// run this from the terminal using :
// npx electro test/index-letnice.js

const { h } = require('mutant')

const Marama = require('../')
require('../lib/styles-inject')()

const marama = Marama({
  today: new Date(2018, 7, 19),
  events: [
    { date: new Date(2018, 3, 4), data: { attending: true } },
    { date: new Date(2018, 7, 19), data: { attending: true } },
    { date: new Date(2018, 7, 21), data: { attending: false } }
  ],
  range: {
    gte: new Date(2018, 7, 13),
    lt: new Date(2018, 7, 20)
  },
  styles: {
    weekFormat: 'columns'
  }
})

const page = h('div',
  {
    style: { margin: '3rem' }
  },
  marama
)

document.body.appendChild(page)
