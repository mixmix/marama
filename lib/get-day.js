module.exports = function getDay (date) {
  const dayIndex = date.getDay()
  return dayIndex === 0 ? 7 : dayIndex

  // Weeks run 0...6 (Sun - Sat)
  // this shifts those days around by 1
}
