import { markEnd, markStart, meta, pauseTimer } from './storage'

const visible = useDocumentVisibility()

let leaveTime = 0
const REFRESH_TIME = 1000 * 60 * 60 * 3 // 3 hours
watchEffect(() => {
  if (visible.value === 'visible') {
    // left for a long while, refresh the page for updates
    if (leaveTime && Date.now() - leaveTime > REFRESH_TIME) { location.reload() }

    // restart timer
    if (meta.value.duration) { markStart() }
  }
  else if (visible.value === 'hidden') {
    leaveTime = Date.now()
    pauseTimer()
  }
}, { flush: 'post' })

watch([meta], () => {
  if (meta.value.passed) {
    markEnd()
  }
}, { flush: 'post', deep: true })
