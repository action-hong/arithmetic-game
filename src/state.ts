import { answers, getAnswerOfDay } from './answers'
import { START_DATE, calcSince, calcTimeToNextDay } from './core'

// 类型, 天数来判断
export type GameType = 'classic' | 'custom'

export const route = useRoute()
export const now = useNow({ interval: 1000 })
export const daySince = useDebounce(computed(() => {
  return calcSince(START_DATE, now.value)
}))
export const timeToNextDay = useDebounce(computed(() => {
  return calcTimeToNextDay(now.value)
}))
export const dayFromParams = ref(0)
export const dayNo = computed(() => dayFromParams.value || daySince.value)

export const gameType = ref<GameType>('classic')
export const customAnswer = ref<string>('')

export const answer = computed(() => gameType.value === 'custom' ? customAnswer.value : getAnswerOfDay(dayNo.value))

export const showHelpDialog = ref(false)
const params = new URLSearchParams(window.location.search)
export const isDev = import.meta.hot || params.get('dev') === 'hey'

export const startDate = ref(START_DATE)
export const endDate = ref(new Date(+START_DATE + 86400000 * (answers.length - 1)))

// 通知
export const showNotify = ref(false)
export const notifyText = ref('')
export type NotifyType = 'success' | 'warning' | 'error' | 'info'
export interface NotifyOption {
  type?: NotifyType
  message: string
}
export const notifyType = ref<NotifyType>('info')
export function notify(option: string | NotifyOption) {
  if (typeof option === 'string') {
    notifyText.value = option
    notifyType.value = 'info'
  }
  else {
    notifyText.value = option.message
    notifyType.value = option.type || 'info'
  }
  showNotify.value = true
}

// 设置
export const showSetting = ref(false)
// 严格模式，式子必须是正确的
export const enableStrictMode = useStorage('__setting_strict', true)
export const autoComplete = useStorage('__setting_autoComplete', false)

// 分享
export const showShareDialog = ref(false)

// 记分牌
export const showScoreBoard = ref(false)
