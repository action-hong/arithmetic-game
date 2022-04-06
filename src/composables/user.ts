interface Stats {
  time: number
  userInput: string[]
  status: 'success' | 'failure' | 'playing'
  [key: string]: any
}

export function useUserInputHistory(key: string) {
  const history = useStorage<Record<string, Stats>>('__user_input_history__', {})

  history.value[key] = history.value[key] || {
    time: 0,
    userInput: [],
    status: 'playing',
  }

  return reactive(history.value[key])
}
