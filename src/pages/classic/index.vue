<script lang="ts" setup>
import { meta } from '~/storage'
import { timeToNextDay } from '~/state'
</script>

<template>
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
