// run this from the terminal using :
// npx electro example/2_doodle.js

const { h, Struct, Array: MutantArray, computed } = require('mutant')
const Marama = require('../')

const state = Struct({
  month: new Date().getMonth() + 1,
  events: MutantArray([])
})

const page = h('div.page', [
  h('div.picker', [
    h('div.month-picker', [
      h('button', { 'ev-click': () => setMonth(-1) }, '<'),
      monthName(state.month),
      h('button', { 'ev-click': () => setMonth(+1) }, '>')
    ]),
    computed(state, ({ month, events }) => {
      return Marama({
        month,
        events,
        onSelect,
        styles: {
          weekFormat: 'rows',
          showNumbers: true,
          tileRadius: 16,
          tileGap: 8
        }
      })
    })
  ]),
  h('div.dates', [
    computed(state.events, events => {
      return events
        .sort((a, b) => a.date - b.date)
        .map(e => h('div.date', e.date.toDateString()))
    })
  ])
])

function setMonth (d) {
  state.month.set(state.month() + d)
}

function monthName (month) {
  const MONTHS = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

  return computed(state.month, m => {
    var monthIndex = m - 1
    while (monthIndex < 0) { monthIndex += 12 }
    return MONTHS[(monthIndex) % 12]
  })
}

function onSelect ({ gte, lt, events }) {
  if (!events.length) addEmptyEvent()
  else clearDay()

  function addEmptyEvent () {
    state.events.push({
      date: gte,
      data: {attending: true}
    })
  }
  function clearDay () {
    const filteredEvents = state.events().filter(e => !events.includes(e))
    state.events.set(filteredEvents)
  }
}

document.body.appendChild(page)


// styles

require('../lib/styles-inject')()
const compile = require('micro-css')

const css = compile(`

div.page { 
  display: grid
  grid-template-columns: auto 1fr
  grid-gap: 2rem

  margin: 3rem

  div.picker {
    div.month-picker {
      font-family: sans
      display: flex
      justify-content: space-between
      align-items: center

      margin-bottom: 1rem

      button { 
        background: none
        border: none
        cursor: pointer
        font-size: 1.5rem
      }
    }
  }

  div.dates {
    div.date {
      background: rebeccapurple
      color: #fff
      font-family: sans
      font-weight: 600

      padding: .5rem
      margin-bottom: .5rem
    }
  }
}

MaramaDayTile {
  border-radius: 4rem
  border: 1px solid hsl(0, 0%, 100%)

  -past {
    cursor: initial
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

MaramaDayLabel {
  font-size: 1rem
}

`)

document.head.appendChild(
  h('style', { innerHTML: css })
)
