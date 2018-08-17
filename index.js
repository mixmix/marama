const h = require('mutant/h')

const MONTH_NAMES = [ 'Ja', 'Fe', 'Ma', 'Ap', 'Ma', 'Ju', 'Ju', 'Au', 'Se', 'Oc', 'No', 'De' ]
const DAYS = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]

module.exports = function Marama (opts) {
  const d = startOfDay()
  const {
    year = d.getFullYear(),
    month = d.getMonth() + 1, // month number (common defn)
    today = d,
    events,
    range,
    setRange = () => {},
    monthNames = MONTH_NAMES
  } = opts

  const monthIndex = month - 1 // month number (Date API defn)
  const monthLength = new Date(year, monthIndex + 1, 0).getDate()
  // NOTE Date takes month as a monthIndex i.e. april = 3
  // and day = 0 goes back a day
  const days = Array(monthLength).fill().map((_, i) => i + 1)

  var weekday
  var week
  const offset = getDay(new Date(year, monthIndex, 1)) - 1

  const setMonthRange = (ev) => {
    setRange({
      gte: new Date(year, monthIndex, 1),
      lt: new Date(year, monthIndex + 1, 1)
    })
  }

  return h('Marama', [
    h('div.month-name', { 'ev-click': setMonthRange }, monthNames[monthIndex]),
    h('div.days',
      {
        style: { display: 'grid' }
      },
      [
        DAYS.map((day, i) => DayName(day, i)),
        days.map(Day)
      ]
    )
  ])

  function Day (day) {
    const date = new Date(year, monthIndex, day)
    const dateEnd = new Date(year, monthIndex, day + 1)
    weekday = getDay(date)
    week = Math.ceil((day + offset) / 7)

    const eventsOnDay = events.filter(e => {
      return e.date >= date && e.date < dateEnd
    })

    const attending = eventsOnDay.some(e => {
      return e.data.attending
    })

    const opts = {
      attributes: {
        'title': `${year}-${month}-${day}`,
        'data-date': `${year}-${month}-${day}`
      },
      style: {
        'grid-row': `${weekday} / ${weekday + 1}`,
        'grid-column': `${week + 1} / ${week + 2}`
        // column moved by 1 to make space for labels
      },
      classList: [
        date < today ? '-past' : '-future',
        eventsOnDay.length ? '-events' : '',
        inRange(date) ? '-range' : '',
        attending ? '-attending' : ''
      ],
      'ev-click': (ev) => {
        if (ev.shiftKey) {
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

    if (!eventsOnDay.length) return h('MaramaDay', opts)

    return h('MaramaDay', opts, [
      // TODO add awareness of whether I'm going to events
      // TODO try a FontAwesome circle
      h('div.dot', [
        // Math.random() > 0.3 ? h('div') : ''
      ])
    ])
  }

  function inRange (date) {
    if (!range || (!range.gte && !range.lt)) return false
    return (date >= range.gte) && (date < range.lt)
  }
}

function DayName (day, index) {
  return h('MaramaDayName', {
    style: {
      'grid-row': `${index + 1} / ${index + 2}`,
      'grid-column': '1 / 2'
    }
  }, day.substr(0, 1))
}

function getDay (date) {
  const dayIndex = date.getDay()
  return dayIndex === 0 ? 7 : dayIndex

  // Weeks run 0...6 (Sun - Sat)
  // this shifts those days around by 1
}

function startOfDay (d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

// function endOfDay (d = new Date()) {
//   return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
// }
