const h = require('mutant/h')
const getDay = require('./lib/get-day')

module.exports = function Day ({ today, year, monthIndex, day, offset, weekFormat, events, range, setRange }) {
  const date = new Date(year, monthIndex, day)
  const dateEnd = new Date(year, monthIndex, day + 1)
  const weekday = getDay(date)
  const week = Math.ceil((day + offset) / 7)

  const eventsOnDay = events.filter(e => {
    return e.date >= date && e.date < dateEnd
  })

  const attending = eventsOnDay.some(e => {
    return e.data.attending
  })

  const style = weekFormat === 'rows'
    ? {
      'grid-row': `${week + 1} / ${week + 2}`, // new weeks on each col (leaving space for labels col)
      'grid-column': `${weekday} / ${weekday + 1}` // new weekdays on each row
      // moved by 1 to make space for labels
    }
    : {
      'grid-row': `${weekday} / ${weekday + 1}`, // new weekdays on each row
      'grid-column': `${week + 1} / ${week + 2}` // new weeks on each col (leaving space for labels col)
    }

  const opts = {
    attributes: {
      'title': `${year}-${monthIndex + 1}-${day}`,
      'data-date': `${year}-${monthIndex + 1}-${day}`
    },
    style,
    classList: [
      date < today ? '-past' : '-future',
      eventsOnDay.length ? '-events' : '',
      inRange(range, date) ? '-range' : '',
      attending ? '-attending' : ''
    ],
    'ev-click': handleRangeSetting
  }

  if (!eventsOnDay.length) return h('MaramaDayTile', opts)

  return h('MaramaDayTile', opts, [
    // TODO add awareness of whether I'm going to events
    // TODO try a FontAwesome circle
    h('div.dot', [
      // Math.random() > 0.3 ? h('div') : ''
    ])
  ])

  function handleRangeSetting (ev) {
    if (ev.shiftKey && range && range.lt) {
      dateEnd >= range.lt
        ? setRange({ lt: dateEnd })
        : setRange({ gte: date })
      return
    }

    setRange({
      gte: date,
      lt: dateEnd
    })
  }
}

function inRange (range, date) {
  if (!range || (!range.gte && !range.lt)) return false
  return (date >= range.gte) && (date < range.lt)
}
