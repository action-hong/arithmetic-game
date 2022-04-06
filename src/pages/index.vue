<script setup lang="ts">
import type { IndexResult } from '~/core'
import { useUserInputHistory } from '~/composables'
import { diff, getTipFromResult } from '~/core'
const answer = $ref('12+35=47')

// 总共可以猜的次数
const count = $ref(6)

// 游戏状态
const {
  status,
  userInput,
} = toRefs(useUserInputHistory(new Date().toLocaleDateString()))
const userInputResult = $computed(() => userInput.value.map(input => diff(answer, input)))

// 当前回答第几次
const currentIndex = $computed(() => userInput.value.length)
// 当前的输入
const currentInput = $(useStorage<string[]>('__user_current_input', []))
// 当前选择的格子
const currentSelectIndex = useStorage<number>('__user_current_select_index', 0)

const markup = $ref('1234567890+-*/='.split(''))
const digitInformation = $computed(() => getTipFromResult(userInputResult))
// 用于底部显示,供用户参考
const showTip = $computed<Array<IndexResult>>(() => markup.map((char, pos) => ({
  char,
  type: digitInformation.get(char) || 'unknown',
  pos,
})))

function handleChangeCurrent(item: IndexResult) {
  if (status.value !== 'playing') { return }
  currentInput[currentSelectIndex.value] = item.char
  if (currentSelectIndex.value < answer.length - 1) {
    currentSelectIndex.value!++
  }
}

function handleInputEnter() {
  if (status.value !== 'playing') { return }
  if (currentInput.filter(item => item.length).length !== answer.length) {
    alert(`请输入完整, 长度必须是${answer.length}`)
    return
  }

  const input = currentInput.join('')
  userInput.value.push(input)

  if (input === answer) {
    nextTick(() => {
      alert('恭喜你, 答对了')
    })
    status.value = 'success'
    currentInput.length = 0
    currentSelectIndex.value = 0
    return
  }

  if (currentIndex === count) {
    nextTick(() => {
      alert('猜的次数用完了!游戏结束了')
    })
    status.value = 'failure'
    return
  }

  // 清空!
  currentInput.length = 0
  currentSelectIndex.value = 0
}

</script>

<template>
  <div>
    <div i-carbon-campsite text-4xl inline-block />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Nerd Game
      </a>
    </p>
    <div py-4 />
    <div flex="~ col" items-center>
      <!-- 已经猜的次数: -->
      <div
        v-for="(row, index) in userInputResult"
        :key="index"
        flex="~"
        items-center
        justify="center"
      >
        <div
          v-for="(item, idx) in row"
          :key="idx"
          :class="{
            'bg-green-500': item.type === 'correct',
            'bg-red-500': item.type === 'wrong',
            'bg-orange-400': item.type === 'wrong position',
          }"
          color="white"
          class="w-8 h-8 m-1"
          flex="~"
          items-center
          justify="center"
        >
          <span>{{ item.char }}</span>
        </div>
      </div>
      <!-- 正在猜的 -->
      <div
        flex="~"
        items-center
        justify="center"
      >
        <div
          v-for="pos in answer.length"
          :key="pos"
          :class="{
            'border-orange-400 border-2': currentSelectIndex === pos - 1 && status === 'playing',
          }"
          bg="gray-600"
          color="white"
          class="w-8 h-8 m-1"
          cursor="pointer"
          flex="~"
          items-center
          justify="center"
          @click.stop="currentSelectIndex = pos - 1"
        >
          <span>{{ currentInput[pos - 1] }}</span>
        </div>
      </div>
      <!-- 剩余的 -->
      <div
        v-for="i in (count - userInput.length)"
        :key="i"
        flex="~"
      >
        <div
          v-for="pos in answer.length"
          :key="pos"
          bg="gray-600"
          color="white"
          class="w-8 h-8 m-1"
        />
      </div>
    </div>
    <div m-2>
      <p>以下是可供的选择:</p>
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
          color="white"
          class="w-8 h-8 m-1"
          flex="~"
          items-center
          justify="center"
          cursor="pointer"
          @click.stop="handleChangeCurrent(item)"
        >
          {{ item.char }}
        </div>
        <div
          bg-green-500
          color="white"
          h-8
          m-1
          p="x-4"
          flex="~"
          items-center
          justify="center"
          cursor="pointer"
          @click="handleInputEnter"
        >
          确定
        </div>
      </div>
    </div>
  </div>
</template>
