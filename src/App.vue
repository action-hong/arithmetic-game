<script lang="ts" setup>
import { decodeEqual } from './core'
import { customAnswer, dayNo, daySince, gameType } from './state'
const route = useRoute()

watch(() => route, (val) => {
  if (val.params.d) {
    dayNo.value = Number(val.params.d)
  }
  else {
    dayNo.value = daySince.value
  }
  if (val.params.answer && typeof val.params.answer === 'string') {
    gameType.value = 'custom'
    customAnswer.value = decodeEqual(val.params.answer)
    // TODO: 校验合法性
  }
  else {
    gameType.value = 'classic'
  }
}, { immediate: true, deep: true })

</script>

<template>
  <main
    font-sans p="x-4 y-4" text="center gray-700 dark:gray-200"
    max-w="400px"
    m="0 auto"
  >
    <Footer />
    <router-view />
    <ModalLayer />
  </main>
</template>
