<script lang="ts" setup>
import type { IndexResultType } from '~/core'

const props = withDefaults(defineProps<{
  type?: IndexResultType
  char?: string
  animated?: boolean
  revealed?: boolean
  idx?: number
}>(), {
  idx: 0,
  animate: false,
})

const flip = ref(false)
watchEffect(() => {
  if (props.animated) {
    setTimeout(() => {
      flip.value = true
    }, 300)
  }
})

</script>

<template>
  <div
    v-if="animated"
    class="relative bg-transparent cell-btn"
    overflow="hidden"
  >
    <div
      :class="{
        'bg-green-500': type === 'correct',
        'bg-red-500': type === 'wrong',
        'bg-orange-400': type === 'wrong position',
        'bg-gray-700': type === 'unknown',
        'revealed': flip
      }"
      class="back flex-block"
      :style="{
        'transition-delay': (300 * idx) + 'ms'
      }"
    >
      {{ char }}
    </div>
    <div
      :class="{
        'bg-green-500': type === 'correct',
        'bg-red-500': type === 'wrong',
        'bg-orange-400': type === 'wrong position',
        'bg-gray-700': type === 'unknown',
        'revealed': flip
      }"
      :style="{
        'transition-delay': (300 * idx) + 'ms'
      }"
      class="front flex-block"
    >
      {{ char }}
    </div>
  </div>
  <div
    v-else
    :class="{
      'bg-green-500': type === 'correct',
      'bg-red-500': type === 'wrong',
      'bg-orange-400': type === 'wrong position',
      'bg-gray-700': type === 'unknown'
    }"
    class="cell-btn"
  >
    {{ char }}
  </div>
</template>

<style>
.back, .front {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform .6s;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.front, .back.revealed{
  transform: rotateY(180deg);
}

.back, .front.revealed {
  transform: rotateY(0);
}
</style>
