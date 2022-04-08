<script lang="ts" setup>
import { enableStrictMode } from '~/state'
</script>

<template>
  <div p="4">
    <div class="flex-block gap-2">
      <SwitchButton
        v-model="enableStrictMode"
        content="严格模式"
        title="该模式下会检验输入的式子的正确性"
      />
    </div>
  </div>
</template>
