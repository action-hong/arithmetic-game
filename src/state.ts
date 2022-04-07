import { getAnswerOfDay } from './answers'
import { START_DATE, isDstObserved } from './core'

// 类型, 天数来判断
export type GameType = 'classic' | 'custom'

export const route = useRoute()
export const now = useNow({ interval: 1000 })
export const daySince = useDebounce(computed(() => {
  const adjustedNow = isDstObserved(now.value) ? new Date(+now.value + 3600000) : now.value
  return Math.floor((+adjustedNow - +START_DATE) / 86400000)
}))
export const dayNo = ref(daySince.value)

export const gameType = ref<GameType>('classic')
export const customAnswer = ref<string>('')

export const answer = computed(() => gameType.value === 'custom' ? customAnswer.value : getAnswerOfDay(dayNo.value))

export const showHelpDialog = ref(false)
const params = new URLSearchParams(window.location.search)
export const isDev = import.meta.hot || params.get('dev') === 'hey'
