// run this from the terminal using :
// npx electro example/index-classic-cal.js

const { h } = require('mutant')
const compile = require('micro-css')

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
  // range: {
  //   gte: new Date(2018, 6, 9),
  //   lt: new Date(2018, 6, 23)
  // },
  styles: {
    weekFormat: 'rows',
    showNumbers: true,
    tileRadius: 16,
    tileGap: 8
  }
})

const page = h('div',
  {
    style: { margin: '3rem' }
  },
  marama
)

document.body.appendChild(page)

//
const mcss = `
MaramaDayTile {
  border-radius: 4rem

  -past {
    background: none
    color: hsl(0, 0%, 60%)

    -events {
      border: 1px solid hsl(0, 0%, 40%)

      -attending {
        background: hsl(0, 0%, 40%)
        color: #fff
      }
    }
  }

  -future {
    background: none

    -events {
      border: 1px solid deepskyblue
      color: deepskyblue

      -attending {
        background: deepskyblue
        color: #fff
      }
    }
  }

  -range {
    background: deeppink

    -future {
      background: deepskyblue
    }
  }
}

`
document.head.appendChild(
  h('style', { innerHTML: compile(mcss) })
)
