/**
* Checks whether a given date is in daylight saving time(夏令时).
* @param date the date object to be checked.
* @returns true if the date is in daylight saving time, false if it's not.
*/
export function isDstObserved(date: Date) {
  const jan = new Date(date.getFullYear(), 0, 1)
  const jul = new Date(date.getFullYear(), 6, 1)
  const standardTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
  return date.getTimezoneOffset() < standardTimezoneOffset
}

export function formatDate(data: Date) {
  // yyyy-MM-dd
  const pad = (n: number) => n < 10 ? `0${n}` : n
  return `${data.getFullYear()}-${pad(data.getMonth() + 1)}-${pad(data.getDate())}`
}

export function calcSince(from: Date, to: Date) {
  const adjustedNow = isDstObserved(to) ? new Date(+to + 3600000) : to
  return Math.floor((+adjustedNow - +from) / 86400000)
}
