const h = require('mutant/h')

module.exports = function DayLabel (day, index, weekFormat) {
  const style = weekFormat === 'rows'
    ? {
      'grid-row': '1 / 2',
      'grid-column': `${index + 1} / ${index + 2}`
    }
    : {
      'grid-row': `${index + 1} / ${index + 2}`,
      'grid-column': '1 / 2'
    }

  return h('MaramaDayLabel', { style }, day.substr(0, 1))
}
