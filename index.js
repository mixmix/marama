const h = require('mutant/h')
const DayTile = require('./day-tile')
const DayLabel = require('./day-label')
const getDay = require('./lib/get-day')

const DAYS = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]
const DEFAULT_FORMAT = 'rows'

module.exports = function Marama (opts = {}) {
  const day = opts.today || startOfDay()
  const {
    events = [],
    month = day.getMonth() + 1, // month number (common defn)
    year = day.getFullYear(),
    range = null,
    onSelect = () => {},
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
    showNumbers: Boolean(styles.showNumbers),
    range,
    onSelect
  }

  return h('div.Marama', { style: getStyles(styles) }, [
    DAYS.map((day, i) => DayLabel(day, i, dayOpts.weekFormat)),
    days.map(day => {
      dayOpts.day = day // note we're mutating this object (might save memory?)
      return DayTile(dayOpts)
    })
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
  const transFormat = ['rows', 'columns'].find(f => f !== format)

  const _styles = {
    '--tile-width': `${2 * tileRadius}px`,
    '--tile-gap': `${tileGap}px`,
    '--dot-width': `${2 * dotRadius || tileRadius}px`,
    '--dot-border': `${dotBorder}px`,
    display: 'grid',
    [`grid-template-${format}`]: 'calc(var(--tile-width) + 2 * var(--tile-gap)) repeat(6, var(--tile-width))',
    [`grid-template-${transFormat}`]: 'repeat(7, var(--tile-width))'
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
