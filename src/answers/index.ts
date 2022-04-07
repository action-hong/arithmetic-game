import { answers } from './list'

export function getAnswerOfDay(day: number) {
  return answers[day] || '12+35=47'
}
