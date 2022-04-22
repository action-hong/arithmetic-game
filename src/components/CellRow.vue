<script lang="ts" setup>
import type { IndexResult } from '~/core'
withDefaults(defineProps<{
  results: Array<IndexResult>
  animated?: boolean
  hideAnswer?: boolean
}>(), {
  animated: true,
  hideAnswer: false,
})
</script>

<template>
  <div
    flex="~"
    items-center
    justify="center"
  >
    <Cell
      v-for="(item, idx) in results"
      :key="idx"
      :idx="idx"
      :animated="animated"
      :char="hideAnswer ? '' : item.char"
      :type="item.type"
    />
  </div>
</template>
