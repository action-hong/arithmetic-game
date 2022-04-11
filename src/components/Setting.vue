<script lang="ts" setup>
import { autoComplete, enableStrictMode } from '~/state'
</script>

<template>
  <div p="4">
    <div class="flex-block gap-2">
      <SwitchButton
        v-model="enableStrictMode"
        content="严格模式"
        title="该模式下会检验输入的式子的正确性"
      />
      <SwitchButton
        v-model="autoComplete"
        content="自动补齐"
        title="该模式下会自动将正确位置的数字填好"
      />
    </div>
  </div>
</template>
