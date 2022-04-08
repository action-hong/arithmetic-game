<script lang="ts" setup>

const props = defineProps({
  min: {
    default: 3,
    type: Number,
  },
  max: {
    default: 10,
    type: Number,
  },
  modelValue: {
    default: 6,
    type: Number,
  },
  title: {
    default: '数字',
    type: String,
  },
})

const emit = defineEmits(['update:modelValue'])

function fixValue(value: number) {
  return Math.max(Math.min(value, props.max), props.min)
}

function handleChange(delta: number) {
  let result = props.modelValue + delta

  result = fixValue(result)

  emit('update:modelValue', result)
}
</script>

<template>
  <div
    class="flex-block"
    flex="gap-2"
    m="2"
  >
    <slot :value="modelValue">
      <span>{{ title }}</span>
      <span w="3">{{ modelValue }}</span>
    </slot>
    <div
      class="btn"
      :class="{
        'cursor-not-allowed': modelValue === min
      }"
      @click="handleChange(-1)"
    >
      -
    </div>
    <div
      class="btn"
      :class="{
        'cursor-not-allowed': modelValue === max
      }"
      @click="handleChange(1)"
    >
      +
    </div>
  </div>
</template>
