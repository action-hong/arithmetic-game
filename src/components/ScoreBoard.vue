<script lang="ts" setup>

import { history } from '~/storage'
import { millisToFormatTime } from '~/core'

const score = $computed(() => {
  const arr = Object.values(history.value)
    .filter(item => (item.tries ? item.tries.length : 0) > 0)

  const total = arr.length
  const passed = arr.filter(item => item.passed).length
  const passedPercent = total === 0 ? '0%' : `${Math.floor(passed * 100 / total)}%`
  const averageTime = total === 0 ? 0 : arr.reduce((acc, item) => acc + (item.duration || 0), 0) / total
  const averageCount = total === 0 ? 0 : arr.reduce((acc, item) => acc + (item.tries ? item.tries.length : 0), 0) / total
  const formatTime = millisToFormatTime(averageTime)

  const max = Math.max(...arr.map(item => item.tries ? item.tries.length : 0))
  const tryData = Array.from({
    length: max,
  }, (_, idx) => ({
    try: idx + 1,
    count: 0,
  }))

  arr.forEach((item) => {
    const temp = item.tries ? item.tries.length : 0
    const index = temp - 1
    tryData[index].count += 1
  })

  const maxTry = Math.max(...tryData.map(item => item.count))

  return {
    total,
    passed,
    passedPercent,
    averageCount,
    formatTime,
    tryData,
    maxTry,
  }
})

</script>

<template>
  <div
    p="8"
    flex="~ col center"
    items-center
  >
    <p text="xl">
      计分板
    </p>
    <div
      m="2"
      py="2"
      px="4"
      flex="~ col center"
      w-full
      max-w-100
      bg-gray:5
    >
      <p>尝试次数分布</p>
      <div
        v-for="item in score.tryData"
        :key="item.try"
        flex="~"
        items-center
      >
        <span w="2" op50>{{ item.try }}</span>
        <div flex="1" ml="2">
          <div
            :style="{
              width: `${item.count / score.maxTry * 100 + 1}%`,
            }"
            h="4"
            flex="~"
            items-center
            justify="end"
            bg-teal
            pr="2"
          >
            <span v-if="item.count > 0" text-sm>{{ item.count }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      flex="~ gap-4"
    >
      <ScoreCell
        :value="score.total"
        title="游戏次数"
      />
      <ScoreCell
        :value="score.passed"
        title="过关次数"
      />
      <ScoreCell
        :value="score.passedPercent"
        title="游戏胜率"
      />
    </div>
    <div
      mt="4"
      flex="~ gap-4"
    >
      <ScoreCell
        :value="score.averageCount.toFixed(2)"
        title="平均尝试次数"
      />
      <ScoreCell
        :value="score.formatTime"
        title="平均耗时"
      />
    </div>
  </div>
</template>
