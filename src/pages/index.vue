<template>
  <div
    grid="~ cols-1 mm:cols-2 gap-2"
  >
    <router-link to="/classic" class="type">
      <span>经典模式</span>
    </router-link>
    <router-link to="/history" class="type">
      <span>历代真题</span>
    </router-link>
    <router-link to="/custom" class="type">
      <span>自定义题目</span>
    </router-link>
  </div>
</template>

<style>
.type {
  @apply h-10 shadow-current p-2 flex justify-center items-center border hover:(color-teal-500)
}
</style>
