<script lang="ts" setup>
import { showHelpDialog, showNotify, showScoreBoard, showSetting, showShareDialog } from '~/state'
</script>

<template>
  <Modal v-model="showHelpDialog">
    <Help />
  </Modal>
  <Modal v-model="showSetting">
    <Setting />
  </Modal>
  <Modal v-model="showNotify">
    <Notification />
  </Modal>
  <Dialog v-model="showShareDialog">
    <Share />
  </Dialog>
  <Modal v-model="showScoreBoard">
    <ScoreBoard />
  </Modal>
</template>
