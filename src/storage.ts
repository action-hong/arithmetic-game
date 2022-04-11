import { answer, dayNo, gameType } from './state'
import type { TriesMeta } from '~/core'

// 正常的,按天的
export const history = useStorage<Record<number | string, TriesMeta>>('__user_input_history__', {})
// 用户自定义分享的题目
export const customAnswerHistory = useStorage<Record<number | string, TriesMeta>>('__user_input_custom_history__', {})

const his = computed(() => gameType.value === 'classic' ? history : customAnswerHistory)
const metaKey = computed(() => gameType.value === 'classic' ? dayNo.value : answer.value)

// 这里的.value.value也太丑了吧
export const meta = computed({
  get() {
    if (!his.value.value[metaKey.value]) {
      his.value.value[metaKey.value] = {
        answer: answer.value,
      }
    }
    return his.value.value[metaKey.value]
  },
  set(v: TriesMeta) {
    his.value.value[metaKey.value] = v
  },
})

export function markStart() {
  if (meta.value.end) { return }
  if (!meta.value.start) { meta.value.start = Date.now() }
}

export function markEnd() {
  if (meta.value.end) { return }

  if (!meta.value.duration) { meta.value.duration = 0 }

  meta.value.end = Date.now()
  if (meta.value.start) { meta.value.duration += meta.value.end - meta.value.start }
}

export function pauseTimer() {
  if (meta.value.end) { return }

  if (!meta.value.duration) { meta.value.duration = 0 }

  if (meta.value.start) {
    meta.value.duration += Date.now() - meta.value.start
    meta.value.start = undefined
  }
}

export const tries = computed({
  get() {
    if (!meta.value.tries) {
      meta.value.tries = []
    }
    return meta.value.tries
  },
  set(v: string[]) {
    meta.value.tries = v
  },
})

// 当前在尝试的
export const currentTry = computed({
  get() {
    if (!meta.value.currentTry) {
      meta.value.currentTry = []
    }
    return meta.value.currentTry
  },
  set(v: string[]) {
    meta.value.currentTry = v
  },
})

// 当前尝试的索引
export const currentTryIndex = computed({
  get() {
    if (!meta.value.currentTryIndex) {
      meta.value.currentTryIndex = 0
    }
    return meta.value.currentTryIndex
  },
  set(v: number) {
    meta.value.currentTryIndex = v
  },
})
