<script lang="ts" setup>
import { showHelpDialog, showNotify } from '~/state'

</script>

<template>
  <Modal v-model="showHelpDialog">
    <Help />
  </Modal>
  <Modal v-model="showNotify">
    <Notification />
  </Modal>
</template>
