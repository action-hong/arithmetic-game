<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'
import { showHelpDialog } from '~/state'

const router = useRouter()
const showBack = computed(() => router.currentRoute.value.path !== '/')

</script>

<template>
  <nav text-xl mt-6 flex gap-2 p="x-5" mb="4">
    <div
      v-if="showBack"
      class="icon-btn"
      i-carbon-arrow-left
      @click="router.go(-1)"
    />
    <div
      flex="~ 1"
      justify="end"
      gap-2
    >
      <button class="icon-btn !outline-none" @click="toggleDark()">
        <div v-if="isDark" i-carbon-moon />
        <div v-else i-carbon-sun />
      </button>

      <a
        class="icon-btn"
        i-carbon-logo-github
        rel="noreferrer"
        href="https://github.com/action-hong"
        target="_blank"
        title="GitHub"
      />

      <div
        class="icon-btn"
        i-carbon-help
        @click="showHelpDialog = true"
      />
    </div>
  </nav>
</template>
