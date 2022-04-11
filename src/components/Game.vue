<script setup lang="ts">
import type { IndexResult } from '~/core'
import { KEY_MARKUP, MARKUP, checkGame, diff, getTipFromResult, millisToFormatTime, win } from '~/core'

import { currentTry, currentTryIndex, markStart, meta, tries } from '~/storage'
import { answer, autoComplete, enableStrictMode, isDev, notify } from '~/state'

const route = useRoute()

// 总共可以猜的次数
const count = ref(6)

watch(() => route.query.tryLimit, (value) => {
  if (value && typeof value === 'string') {
    count.value = Math.max(parseInt(value, 10), 3)
  }
}, { immediate: true })

// 游戏状态
const canPlay = $computed(() => !meta.value.passed && !meta.value.failed)

const userInputResult = $computed(() => tries.value.map(input => diff(answer.value, input)))

// 当前回答第几次
const currentIndex = $computed(() => tries.value.length)
// 还剩几次
const remainCount = $computed(() => count.value - currentIndex)

const digitInformation = $computed(() => getTipFromResult(userInputResult))
// 用于底部显示,供用户参考
const showTip = $computed<Array<IndexResult>>(() => MARKUP.map((char, pos) => ({
  char,
  type: digitInformation.get(char) || 'unknown',
  pos,
})))

function changeCurrentSelectIndex(delta: number) {
  if (!canPlay) { return }
  currentTryIndex.value! += delta
  if (currentTryIndex.value! < 0) {
    currentTryIndex.value! = 0
  }
  if (currentTryIndex.value! >= answer.value.length) {
    currentTryIndex.value! = answer.value.length - 1
  }
}

function handleChangeCurrent(item: Partial<IndexResult> & { char: string }, autoNext = true) {
  if (!canPlay) { return }
  markStart()
  currentTry.value[currentTryIndex.value] = item.char
  if (autoNext) {
    changeCurrentSelectIndex(1)
  }
}

function handleInputEnter() {
  if (!canPlay) { return }
  if (currentTry.value.filter(item => item.length).length !== answer.value.length) {
    notify({
      type: 'warning',
      message: '请输入完整的等式',
    })
    return
  }

  const input = currentTry.value.join('')

  if (enableStrictMode.value) {
    const {
      error,
      code,
    } = checkGame(input)

    if (code !== 0) {
      notify({
        type: 'error',
        message: error,
      })
      return
    }
  }

  tries.value.push(input)
  currentTry.value.length = 0
  currentTryIndex.value = 0
  if (input === answer.value) {
    win()
    meta.value.passed = true
    return
  }

  if (currentIndex === count.value) {
    meta.value.failed = true
    return
  }

  // 自动补齐
  if (autoComplete.value) {
    // 找出所有正确位置的数字
    userInputResult.flat().filter(item => item.type === 'correct').forEach((item) => {
      const { pos, char } = item
      currentTry.value[pos] = char
    })
    currentTryIndex.value = currentTry.value.findIndex(item => item === undefined)
  }
}

function handleInputDelete(goBack = false) {
  if (!canPlay) { return }
  currentTry.value[currentTryIndex.value] = ''
  if (goBack) {
    changeCurrentSelectIndex(-1)
  }
}

KEY_MARKUP.forEach((val) => {
  const key = typeof val === 'string' ? val : val[0]
  const value = typeof val === 'string' ? val : val[1]
  onKeyStroke(key, () => {
    handleChangeCurrent({
      char: value,
    })
  })
})

// 光标方向
;([['ArrowLeft', -1], ['ArrowRight', 1]] as const)
  .forEach(([key, delta]) => {
    onKeyStroke(key, () => {
      changeCurrentSelectIndex(delta)
    })
  })

// 回车
onKeyStroke('Enter', handleInputEnter)
// Delete
onKeyStroke('Delete', () => handleInputDelete())
// 回退
onKeyStroke('Backspace', () => handleInputDelete(true))

// 花费的时间
const duration = computed(() => millisToFormatTime(meta.value.duration))

</script>

<template>
  <div>
    <div i-carbon-campsite text-4xl inline-block />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Nerd Game
      </a>
    </p>
    <p v-if="isDev">
      {{ answer }}
    </p>
    <div py-2 />
    <div flex="~ col" items-center>
      <!-- 已经猜的次数: -->
      <CellRow
        v-for="(row, index) in userInputResult"
        :key="index"
        :results="row"
        :animated="false"
      />
      <!-- 正在猜的 -->
      <div
        v-if="canPlay"
        flex="~"
        items-center
        justify="center"
      >
        <div
          v-for="pos in answer.length"
          :key="pos"
          :class="{
            'border-orange-400 border-2': currentTryIndex === pos - 1
          }"
          class="cell-btn"
          @click.stop="currentTryIndex = pos - 1"
        >
          <span>{{ currentTry[pos - 1] }}</span>
        </div>
      </div>
      <!-- 剩余的, 注意要减一, 减去的1行是正在猜的 -->
      <template v-if="canPlay">
        <div
          v-for="i in (remainCount - 1)"
          :key="i"
          flex="~"
        >
          <div
            v-for="pos in answer.length"
            :key="pos"
            class="cell"
          />
        </div>
      </template>
      <template v-else>
        <p
          text-3xl m="y-2"
          :class="{
            'text-green-500': meta.passed,
            'text-red-500': meta.failed,
          }"
        >
          {{ meta.passed ? '你猜对了' : '你失败了!' }}
        </p>
      </template>
    </div>
    <div m-2>
      <p>选择</p>
      <div
        flex="~ wrap"
        items-center
        justify="center"
      >
        <div
          v-for="(item, index) in showTip"
          :key="index"
          :class="{
            'bg-green-500': item.type === 'correct',
            'bg-red-500': item.type === 'wrong',
            'bg-orange-400': item.type === 'wrong position',
            'bg-gray-700': item.type === 'unknown'
          }"
          class="cell-btn"
          @click.stop="handleChangeCurrent(item)"
        >
          {{ item.char }}
        </div>
      </div>
      <div
        flex="~ wrap"
        items-center
        justify="center"
      >
        <div
          bg-green-500
          w="auto"
          p="x-2"
          class="cell-btn"
          @click="handleInputEnter"
        >
          Enter
        </div>
        <div
          bg-green-500
          w="auto"
          p="x-2"
          class="cell-btn"
          @click="handleInputDelete()"
        >
          DELETE
        </div>
      </div>
    </div>
    <p v-if="meta.passed" op-50 text="gray-500">
      耗时：{{ duration }}
    </p>
  </div>
</template>
