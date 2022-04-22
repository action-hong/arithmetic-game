<script lang="ts" setup>

import type { IndexResult, IndexResultType } from '~/core'

function getResult(array: string, index: number, type: IndexResultType): Array<IndexResult> {
  return array.split('').map((char, idx) => ({
    char,
    type: idx === index ? type : 'unknown',
    pos: idx,
  }))
}

const result1 = getResult('5×24=120', 0, 'correct')
const result2 = getResult('5×24=120', 2, 'wrong position')
const result3 = getResult('5×24=120', 5, 'wrong')

</script>

<template>
  <div
    p-4
    bg="dark:black white"
    flex="~"
    items-center
    justify="center"
  >
    <div p="x-4" w="90% mm:350px">
      <p text="2xl" m-2>
        规则
      </p>
      <ul
        text="left"
        list="circle"
      >
        <li>
          每一次猜测都必须是一个等式
        </li>
        <li>
          你可以是使用0 1 2 3 4 5 6 7 9 + - * / 和 =
        </li>
        <li>
          必须包含一个 "="
        </li>
        <li>
          "=" 好右边只可能是一个数, 不能是一个计算式子
        </li>
        <li>
          注意计算符号的优先级，先乘除后加减
        </li>
      </ul>
      <CellRow
        :key="index"
        :results="result1"
        :animated="false"
      />
      <p m-y2>
        <span text="green-500">5</span>在答案中，且在正确的位置
      </p>
      <CellRow
        :key="index"
        :results="result2"
        :animated="false"
      />
      <p m-y2>
        <span text="orange-400">2</span>在答案中，但不在正确的位置
      </p>
      <CellRow
        :key="index"
        :results="result3"
        :animated="false"
      />
      <p m-y2>
        <span text="red-500">1</span>不再答案中
      </p>
    </div>
  </div>
</template>
