<script lang="ts" setup>
import { ANSWER_LENGTH, KEY_MARKUP, MARKUP, encodeEqual } from '~/core'
import { notify } from '~/state'

const count = ref(ANSWER_LENGTH)
const answer = ref<string[]>([])

const currentIndex = ref(0)

const url = $computed(() => {
  return `${window.location.origin}/custom/${encodeEqual(answer.value.join(''))}`
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
  answer.value[currentIndex.value] = item
  if (autoNext) {
    changeCurrentSelectIndex(1)
  }
}

function handleInputEnter() {
  // if (answer.value.filter(item => item.length).length !== answer.value.length) {
  //   // 有错误
  //   notify('请输入正确的四则运算')
  // }

  copy(url)
  notify('已复制链接到粘贴板, 分享给你的朋友吧~')
}

function handleInputDelete(goBack = true) {
  answer.value[currentIndex.value] = ''
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
