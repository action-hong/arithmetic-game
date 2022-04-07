import type { Options } from 'canvas-confetti'
import confetti from 'canvas-confetti'

export interface TriesMeta {
  answer?: string
  start?: number
  end?: number
  duration?: number
  tries?: string[]
  // 数字位置必须正确10+20=30, 不能是20+10=30
  strict?: boolean
  // 当前的输入, 还没有提交
  currentTry?: string[]
  currentTryIndex?: number
  hint?: boolean
  hintLevel?: number
  passed?: boolean
  failed?: boolean
}

const count = 200
const defaults: Options = {
  origin: { y: 0.7 },
}

function fire(particleRatio: number, opts: Options) {
  confetti(Object.assign({}, defaults, opts, {
    particleCount: Math.floor(count * particleRatio),
  }))
}

export function win() {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  })
  fire(0.2, {
    spread: 60,
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  })
}
