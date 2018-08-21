const h = require('mutant/h')
const getDay = require('./lib/get-day')

module.exports = function Day ({ today, year, monthIndex, day, offset, weekFormat, showNumbers, events, range, onSelect }) {
  const date = new Date(year, monthIndex, day)
  const dateEnd = new Date(year, monthIndex, day + 1)
  const weekday = getDay(date)
  const week = Math.ceil((day + offset) / 7)

  const eventsOnDay = eventsInRange({gte: date, lt: dateEnd})
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
    style,
    classList: [
      date < today ? '-past' : '-future',
      eventsOnDay.length ? '-events' : '',
      inRange(range, date) ? '-range' : '',
      attending ? '-attending' : ''
    ],
    attributes: {
      'title': `${year}-${monthIndex + 1}-${day}`,
      'data-date': `${year}-${monthIndex + 1}-${day}`
    }
  }
  if (onSelect) opts['ev-click'] = handleSelect

  return h('div.MaramaDayTile', opts, [
    showNumbers
      ? day : eventsOnDay.length
        ? h('div.dot') : ''
  ])

  /// helpers

  function eventsInRange (range) {
    return events.filter(e => inRange(range, e.date))
  }

  function handleSelect (ev) {
    if (ev.shiftKey && validRange(range)) {
      const newRange = dateEnd >= range.lt
        ? { gte: range.gte, lt: dateEnd }
        : { gte: date, lt: range.lt }
      newRange.events = eventsInRange(newRange)

      return onSelect(newRange)
    }

    return onSelect({
      gte: date,
      lt: dateEnd,
      events: eventsOnDay
    })
  }
}

function inRange (range, date) {
  if (!validRange(range)) return false
  return (date >= range.gte) && (date < range.lt)
}

function validRange (range) {
  if (!range) return false
  if (!(range.gte instanceof Date)) return false
  if (!(range.lt instanceof Date)) return false

  return true
}
