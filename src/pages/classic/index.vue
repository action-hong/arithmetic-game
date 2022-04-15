<script lang="ts" setup>
import { meta } from '~/storage'
import { timeToNextDay, dayNo } from '~/state'
</script>

<template>
  <p>No. {{ dayNo }} 天</p>
  <Game />
  <template v-if="meta.passed">
    <p text="cool-gray-500">
      距离下一次更新还有
    </p>
    <p>
      {{ timeToNextDay }}
    </p>
  </template>
</template>
