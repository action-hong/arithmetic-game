<script lang="ts" setup>
import { showHelpDialog } from '~/state'

</script>

<template>
  <Modal v-model="showHelpDialog">
    <Help />
  </Modal>
</template>
