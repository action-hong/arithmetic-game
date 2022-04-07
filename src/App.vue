<script lang="ts" setup>
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
    // TODO: 校验合法性
    gameType.value = 'custom'
    customAnswer.value = atob(val.params.answer)
  }
  else {
    gameType.value = 'classic'
  }
}, { immediate: true, deep: true })

</script>

<template>
  <main font-sans p="x-4 y-4" text="center gray-700 dark:gray-200">
    <Footer />
    <router-view />
    <ModalLayer />
  </main>
</template>
