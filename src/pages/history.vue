<script lang="ts" setup>
import { endDate, startDate } from '~/state'
import { calcSince, formatDate } from '~/core'

const min = computed(() => formatDate(startDate.value))
const max = computed(() => formatDate(endDate.value))

const value = ref(formatDate(new Date()))

const dayNo = computed(() => {
  return calcSince(startDate.value, new Date(value.value))
})

</script>

<template>
  <div>
    <p mb-2>
      请选择你要玩的一天
    </p>
    <p mb-2>
      <input v-model="value" type="date" :min="min" :max="max">
    </p>
    <router-link class="btn" :to="'/classic/' + dayNo">
      冲吧！
    </router-link>
  </div>
</template>
