export const TRIES_LIMIT = 6
export const START_DATE = new Date(2022, 3, 7)
export const ANSWER_LENGTH = 8
export const MARKUP = '1234567890+-×÷='.split('')
const SPECIAL_MARKUP = [
  ['*', '×'],
  ['/', '÷'],
]
export const KEY_MARKUP = [
  ...MARKUP.filter(m => m !== '×' && m !== '÷'),
  ...SPECIAL_MARKUP,
]

export const CUSTOM_TRIES_LIMIT_MIN = 3
export const CUSTOM_TRIES_LIMIT_MAX = 10
