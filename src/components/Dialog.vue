<script lang="ts" setup>
withDefaults(defineProps<{
  modelValue?: boolean
  direction?: string
  mask?: boolean
}>(), {
  modelValue: false,
  mask: true,
})

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <div
    fixed z-40
    class="left-0 right-0 top-0 bottom-0 flex"
    items="center"
    justify="center"
    :class="modelValue ? '': 'pointer-events-none'"
  >
    <div
      v-if="mask"
      class="bg-base left-0 right-0 top-0 bottom-0 absolute transition-opacity duration-500 ease-out"
      :class="modelValue ? 'opacity-50': 'opacity-0'"
      @click="$emit('update:modelValue', false)"
    />
    <div
      class="bg-base relative border-base transition-all duration-200 ease-out max-w-screen max-h-screen overflow-auto"
      border="rounded-lg"
      :style="modelValue ? {} : { transform: 'scale(0)' }"
    >
      <slot />
    </div>
  </div>
</template>
