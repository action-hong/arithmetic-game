<script lang="ts" setup>
import { notifyText, notifyType } from '~/state'
</script>

<template>
  <div
    p="x-4 y-2"
    :class="{
      'color-green-500': notifyType === 'success',
      'bg-red-500': notifyType === 'error',
      'bg-orange-400': notifyType === 'warning',
    }"
  >
    {{ notifyText }}
  </div>
</template>
