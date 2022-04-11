export type IndexResultType = 'correct' | 'wrong position' | 'wrong' | 'unknown'

export interface IndexResult {
  pos: number
  char: string
  type: IndexResultType
}

export function diff(answer: string, input: string): Array<IndexResult> {
  if (answer.length !== input.length) {
    throw new Error('Answer and input must be the same length')
  }
  const result: Array<IndexResult> = []
  const answerChars = answer.split('').map(item => ({
    item,
    selected: false,
  }))
  for (let i = 0; i < answer.length; i++) {
    const char = answer[i]
    const inputChar = input[i]
    if (char === inputChar) {
      result.push({
        pos: i,
        char: inputChar,
        type: 'correct',
      })
      answerChars[i].selected = true
    }
    else if (
      answerChars.findIndex(item => item.item === inputChar && !item.selected) !== -1
    ) {
      result.push({
        pos: i,
        char: inputChar,
        type: 'wrong position',
      })
    }
    else {
      result.push({
        pos: i,
        char: inputChar,
        type: 'wrong',
      })
    }
  }
  return result
}

const typeOrder: IndexResultType[] = ['correct', 'wrong position', 'wrong', 'unknown']

export function getTipFromResult(result: Array<Array<IndexResult>>) {
  const map = new Map<string, IndexResultType>()
  result.forEach((arr) => {
    arr.reduce((acc, item) => {
      if (!acc.has(item.char)) {
        acc.set(item.char, item.type)
      }
      else {
        const currentType = acc.get(item.char)
        const currentIndex = typeOrder.findIndex(item => item === currentType)
        const newIndex = typeOrder.findIndex(key => key === item.type)
        if (newIndex < currentIndex && newIndex >= 0) {
          acc.set(item.char, item.type)
        }
      }
      return acc
    }, map)
  })
  return map
}
