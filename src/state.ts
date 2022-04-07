import { getAnswerOfDay, answers } from './answers'
import { START_DATE, calcSince } from './core'

// 类型, 天数来判断
export type GameType = 'classic' | 'custom'

export const route = useRoute()
export const now = useNow({ interval: 1000 })
export const daySince = useDebounce(computed(() => {
  return calcSince(START_DATE, now.value)
}))
export const dayNo = ref(daySince.value)

export const gameType = ref<GameType>('classic')
export const customAnswer = ref<string>('')

export const answer = computed(() => gameType.value === 'custom' ? customAnswer.value : getAnswerOfDay(dayNo.value))

export const showHelpDialog = ref(false)
const params = new URLSearchParams(window.location.search)
export const isDev = import.meta.hot || params.get('dev') === 'hey'

export const startDate = ref(START_DATE)
export const endDate = ref(new Date(+START_DATE + 86400000 * (answers.length - 1)))
