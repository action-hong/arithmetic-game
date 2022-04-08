<script lang="ts" setup>
import { ANSWER_LENGTH, CUSTOM_ANSWER_LENGTH_MAX, CUSTOM_ANSWER_LENGTH_MIN, CUSTOM_TRIES_LIMIT_MAX, CUSTOM_TRIES_LIMIT_MIN, KEY_MARKUP, MARKUP, TRIES_LIMIT, checkGame, encodeEqual } from '~/core'
import { notify } from '~/state'

const count = ref(ANSWER_LENGTH)
const arr = ref<string[]>([])
const answer = $computed(() => arr.value.slice(0, count.value).join(''))
// 猜的次数
const tryLimit = ref(TRIES_LIMIT)

const currentIndex = ref(0)

const url = $computed(() => {
  let str = `${window.location.origin}/custom/${encodeEqual(answer)}`
  if (tryLimit.value !== TRIES_LIMIT) {
    str += `?tryLimit=${tryLimit.value}`
  }
  return str
})
const { copy } = useClipboard()

function changeCurrentSelectIndex(delta: number) {
  currentIndex.value! += delta
  if (currentIndex.value! < 0) {
    currentIndex.value! = 0
  }
  if (currentIndex.value! >= count.value) {
    currentIndex.value! = count.value - 1
  }
}

function handleChangeCurrent(item: string, autoNext = true) {
  arr.value[currentIndex.value] = item
  if (autoNext) {
    changeCurrentSelectIndex(1)
  }
}

function handleInputEnter() {
  if (answer.length !== count.value) {
    notify({
      type: 'warning',
      message: '请输入完整的等式',
    })
    return
  }

  const {
    error,
    code,
  } = checkGame(answer)

  if (code !== 0) {
    notify({
      type: 'error',
      message: error,
    })
    return
  }

  copy(url)
    .then(() => {
      notify({
        type: 'success',
        message: '复制成功',
      })
    })
}

function handleInputDelete(goBack = true) {
  arr.value[currentIndex.value] = ''
  if (goBack) {
    changeCurrentSelectIndex(-1)
  }
}

KEY_MARKUP.forEach((val) => {
  const key = typeof val === 'string' ? val : val[0]
  const value = typeof val === 'string' ? val : val[1]
  onKeyStroke(key, () => {
    handleChangeCurrent(value)
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

</script>

<template>
  <NumberRange
    v-slot="{ value }"
    v-model="tryLimit"
    :min="CUSTOM_TRIES_LIMIT_MIN"
    :max="CUSTOM_TRIES_LIMIT_MAX"
    title="猜的次数"
  >
    <span>对方能猜</span>
    <span w="3">{{ value }}</span>
    <span>次</span>
  </NumberRange>
  <NumberRange
    v-model="count"
    :min="CUSTOM_ANSWER_LENGTH_MIN"
    :max="CUSTOM_ANSWER_LENGTH_MAX"
    title="式子的长度"
  />
  <p m2>
    请尝试输入你想要的四则运算
  </p>
  <p m2>
    确保式子是正确的
  </p>
  <div
    flex="~"
    items-center
    justify="center"
  >
    <div
      v-for="pos in count"
      :key="pos"
      :class="{
        'border-orange-400 border-2': currentIndex === pos - 1
      }"
      class="cell-btn"
      @click.stop="currentIndex = pos - 1"
    >
      {{ answer[pos - 1] }}
    </div>
  </div>
  <!-- 这一部分好重构下! -->
  <div m-2>
    <p>选择</p>
    <div
      flex="~ wrap"
      items-center
      justify="center"
    >
      <div
        v-for="(item, index) in MARKUP"
        :key="index"
        class="cell-btn"
        @click.stop="handleChangeCurrent(item)"
      >
        {{ item }}
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
        生成
      </div>
      <div
        bg-green-500
        w="auto"
        p="x-2"
        class="cell-btn"
        @click="handleInputDelete()"
      >
        删除
      </div>
    </div>
  </div>
</template>
