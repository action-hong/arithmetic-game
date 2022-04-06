<template>
  <div
    p-4
    bg="dark:black white"
    flex="~"
    items-center
    justify="center"
  >
    <div w="50% <sm:100%">
      <p text="2xl" m-2>规则</p>
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
          注意计算符号的优先级
        </li>
      </ul>
    </div>
  </div>
</template>
