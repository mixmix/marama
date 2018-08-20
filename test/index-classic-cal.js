// run this from the terminal using :
// npx electro test/index-classic-cal.js

const { h } = require('mutant')

const Marama = require('../')
require('../lib/styles-inject')()

const marama = Marama({
  today: new Date(2018, 6, 12),
  events: [
    { date: new Date(2018, 3, 4), data: { attending: true } },
    { date: new Date(2018, 6, 5), data: { attending: true } },
    { date: new Date(2018, 6, 7), data: { attending: false } },
    { date: new Date(2018, 6, 17), data: { attending: true } },
    { date: new Date(2018, 6, 21), data: { attending: false } },
    { date: new Date(2018, 6, 27), data: { attending: true } }
  ],
  range: {
    gte: new Date(2018, 6, 9),
    lt: new Date(2018, 6, 23)
  },
  styles: {
    weekFormat: 'rows',
    tileRadius: 18,
    tileGap: 4
  }
})

const page = h('div',
  {
    style: { margin: '3rem' }
  },
  marama
)

document.body.appendChild(page)
