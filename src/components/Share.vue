<script lang="ts" setup>
import { diff, millisToFormatTime } from '~/core'
import { meta, tries } from '~/storage'
import { answer, notify, showShareDialog } from '~/state'
import { shareweibo } from '~/utils'

const userInputResult = $computed(() => tries.value.map(input => diff(answer.value, input)))

const squareMessage = $computed(() => userInputResult.map(item => item.map(({ type }) => {
  if (type === 'correct') { return '🟩' }
  if (type === 'wrong position') { return '🟧' }
  return '🟥'
}).join('')).join('\n'))

const passed = $computed(() => meta.value.passed)
const failed = $computed(() => meta.value.failed)

// 花费的时间
const duration = computed(() => millisToFormatTime(meta.value.duration || 0))

const { copy } = useClipboard()

const route = useRoute()

const count = ref(6)

watch(() => route.query.tryLimit, (value) => {
  if (value && typeof value === 'string') {
    count.value = Math.max(parseInt(value, 10), 3)
  }
}, { immediate: true })

const shareMessage = $computed(() => {
  let share = ''
  if (passed) {
    share = `猜猜猜 ${userInputResult.length}/${count.value}\n`
    share += `我用了 ${duration.value} 就猜对了！你也来试试吧！\n\n`
  }
  else if (failed) {
    share = '我失败了! 你也来试试吧！\n\n'
  }
  else {
    share = '我正在做这道题，你也来试试吧朋友！'
  }
  share += squareMessage
  share += `\n\n${window.location.href}`
  return share
})

function goShare() {
  copy(shareMessage)
    .then(() => {
      notify({
        type: 'success',
        message: '已复制到粘贴板了！分享给你的朋友吧！',
      })
    })
  showShareDialog.value = false
}

function goWeibo() {
  shareweibo(
    shareMessage,
    window.location.href,
  )
}
</script>

<template>
  <div
    p="4"
    bg="#ffffff"
    class="text-black"
  >
    <template v-if="meta.passed">
      <p class="text-lg">
        你赢了！！
      </p>
    </template>
    <template v-else-if="meta.failed">
      <p class="text-lg">
        你输了！！
      </p>
    </template>
    <p class="text-lg">
      分享给你的朋友试试吧！
    </p>
    <CellRow
      v-for="(row, index) in userInputResult"
      :key="index"
      :results="row"
      :animated="false"
      :hide-answer="true"
    />
    <p v-if="meta.passed" m="2">
      干得漂亮！你总共用了 {{ duration }}
    </p>
    <div
      class="btn m-2"
      @click="goShare"
    >
      分享
    </div>
    <div
      flex="~"
      justify="center"
      items="center"
    >
      <div
        class="icon-btn"
        i-ant-design-weibo-outlined
        @click="goWeibo"
      />
    </div>
  </div>
</template>
