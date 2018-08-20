const h = require('mutant/h')
const DayTile = require('./day-tile')
const DayLabel = require('./day-label')
const getDay = require('./lib/get-day')

const MONTH_NAMES = [ 'Ja', 'Fe', 'Ma', 'Ap', 'Ma', 'Ju', 'Ju', 'Au', 'Se', 'Oc', 'No', 'De' ]
const DAYS = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]
const DEFAULT_FORMAT = 'rows'

module.exports = function Marama (opts = {}) {
  const day = opts.today || startOfDay()
  const {
    events = [],
    month = day.getMonth() + 1, // month number (common defn)
    year = day.getFullYear(),
    monthNames = MONTH_NAMES,
    range,
    setRange = () => {},
    styles = {},
    today = day
  } = opts
  if (opts.style) console.error('Marama: you have passed in **style** instead of styles!')

  const monthIndex = month - 1 // month number (Date API defn)
  const monthLength = new Date(year, monthIndex + 1, 0).getDate()
  // NOTE Date takes month as a monthIndex i.e. april = 3
  // and day = 0 goes back a day
  const days = Array(monthLength).fill().map((_, i) => i + 1)
  const dayOpts = {
    events,
    year,
    monthIndex,
    // day TBD
    today,
    offset: getDay(new Date(year, monthIndex, 1)) - 1, // how far into the week the month starts
    weekFormat: getWeekFormat(styles),
    range,
    setRange
  }

  const setMonthRange = (ev) => {
    setRange({
      gte: new Date(year, monthIndex, 1),
      lt: new Date(year, monthIndex + 1, 1)
    })
  }

  return h('Marama', [
    // h('div.month-name', { 'ev-click': setMonthRange }, monthNames[monthIndex]),
    h('div.days', { style: getStyles(styles) }, [
      DAYS.map((day, i) => DayLabel(day, i, dayOpts.weekFormat)),
      days.map(day => {
        dayOpts.day = day // note we're mutating this object (might save memory?)
        return DayTile(dayOpts)
      })
    ])
  ])
}

function getStyles (styles = {}) {
  const {
    tileRadius = 6,
    tileGap = 1,
    dotRadius,
    dotBorder = 1
  } = styles
  const format = getWeekFormat(styles)

  const _styles = {
    '--tile-radius': `${tileRadius}px`,
    '--tile-gap': `${tileGap}px`,
    '--dot-radius': `${dotRadius || Math.floor(tileRadius / 2)}px`,
    '--dot-border': `${dotBorder}px`,
    display: 'grid',
    [`grid-template-${format}`]: '2 * calc(var(--tile-radius) + 2 * var(--tile-gap)) repeat(6, calc(2 * var(--tile-radius)))'
  }

  return _styles
}

function getWeekFormat (styles) {
  if (styles.weekFormat && !['rows', 'columns'].includes(styles.weekFormat)) {
    throw new Error('marama styles.weekFormat must be either "rows" or "columns"')
  }
  return styles.weekFormat || DEFAULT_FORMAT
}

function startOfDay (d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

// function endOfDay (d = new Date()) {
//   return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
// }
