<script lang="ts" setup>
defineProps<{
  value: string | number
  title: string
}>()
</script>

<template>
  <div
    flex="~ col"
    items-center
    justify="center"
    bg-gray:5
    h-20
    px="2"
  >
    <span text="xl">{{ value }}</span>
    <span op-50 text="gray-500">{{ title }}</span>
  </div>
</template>
