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

const pad = (n: number) => n < 10 ? `0${n}` : n

export function formatDate(data: Date) {
  // yyyy-MM-dd
  return `${data.getFullYear()}-${pad(data.getMonth() + 1)}-${pad(data.getDate())}`
}

export function calcSince(from: Date, to: Date) {
  const adjustedNow = isDstObserved(to) ? new Date(+to + 3600000) : to
  return Math.floor((+adjustedNow - +from) / 86400000)
}

export function calcTimeToNextDay(from: Date) {
  const tomorrow = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1)
  const time = +tomorrow - +from
  return millisToFormatTime(time)
}

export function millisToFormatTime(millis: number) {
  const hour = Math.floor(millis / 3600000)
  const minutes = Math.floor((millis % 3600000) / 60000)
  const seconds = Math.floor((millis % 60000) / 1000)
  return `${hour === 0 ? '' : `${hour}时`}${minutes === 0 ? '' : `${pad(minutes)}分`}${pad(seconds)}秒`
}

const OP_MAP = [
  [/\+/g, 'j'],
  [/\-/g, 'k'],
  [/\×/g, 'l'],
  [/\÷/g, 'm'],
  [/\=/g, 'n'],
  [/\*/g, 'l'],
  [/\//g, 'm'],
] as const

const OP_MAP_REVERSE = [
  [/j/g, '+'],
  [/k/g, '-'],
  [/l/g, '×'],
  [/m/g, '÷'],
  [/n/g, '='],
] as const

export function answerEqual(a: string, b: string) {
  OP_MAP.forEach(([op, code]) => {
    a = a.replace(op, code)
    b = b.replace(op, code)
  })
  return a === b
}

export function decodeEqual(str: string) {
  str = atob(str)
  OP_MAP_REVERSE.forEach(([op, code]) => {
    str = str.replace(op, code)
  })
  return str
}

export function encodeEqual(str: string) {
  OP_MAP.forEach(([op, code]) => {
    str = str.replace(op, code)
  })
  return btoa(str)
}

export function checkGame(str: string) {
  if (str.split('').filter(c => c === '=').length !== 1) {
    return {
      error: '必须有一个等号',
      code: 1,
    }
  }

  str = str.replace('=', '==')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')

  try {
    // eslint-disable-next-line no-eval
    const result = eval(str)
    return {
      error: result ? '' : '表达式不正确',
      code: result ? 0 : 2,
    }
  }
  catch (error) {
    return {
      error: `表达式不正确：${(error as Error).message}`,
      code: 2,
    }
  }
}
