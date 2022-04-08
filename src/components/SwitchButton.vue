<script lang="ts" setup>
defineProps({
  title: {
    default: '',
    type: String,
  },
  content: {
    default: '',
    type: String,
  },
  modelValue: {
    default: false,
    type: Boolean,
  },
})

defineEmits([
  'update:modelValue',
])
</script>

<template>
  <button
    class="square-btn"
    :title="title"
    :class="{
      'square-selected-btn': modelValue
    }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    {{ content }}
    <div
      v-if="modelValue"
      absolute
      top="0"
      right="0"
      w-2
      h-2
      bg="teal-500"
    />
  </button>
</template>
