// 用于生成计算式
function generate() {
  // 12+13=25
  // 12+1-9=4
  // 八位数，等于号只能放在第4,5,6位
  const equalIndex = random(4, 6)
  if (equalIndex === 4) {
    return generateWhenEqualIn4()
  }
  else if (equalIndex === 5) {
    return generateWhenEqualIn5()
  }
  return generateWhenEqualIn4()
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomFormArray(array) {
  return array[random(0, array.length - 1)]
}

function generateWhenEqualIn4() {
  // 此时结果是三位数
  // 一个两位数和一位数运算，只可能值加法或乘法
  const op = randomFormArray(['+', '*'])
  // 运算符位置
  const opIndex = random(1, 2)
  let small = 0
  let big = 0
  let result = 0
  if (op === '+') {
    // 加法
    big = random(91, 99)
    small = random(100 - big, 9)
    result = big + small
  }
  else {
    // 乘法
    small = random(2, 9)
    big = random(Math.floor(100 / small), Math.floor(999 / small))
    result = big * small
  }
  if (opIndex === 1) {
    return `${big}${op}${small}=${result}`
  }
  return `${small}${op}${big}=${result}`
}

function generateWhenEqualIn5() {
  // 结果是个2位数
  // 运算符只能在 1 或 2 或 3
  // 在1的时候，3也必须有运算符
  const opIndex = random(1, 3)

  if (opIndex === 2) {
    // 两个两位数相加或相减
    const op = randomFormArray(['+', '-'])
    if (op === '-') {
      const small = random(10, 89)
      const big = random(small + 10, 99)
      const result = big - small
      return `${big}${op}${small}=${result}`
    }
    else {
      // 加法
      const left = random(10, 89)
      const right = random(10, 99 - left)
      const result = left + right
      return `${left}${op}${right}=${result}`
    }
  }
  else if (opIndex === 3) {
    // 一个三位数 和 一个一位数 运算 得出两位数
    // 那么只能是除法 或减法
    const op = randomFormArray(['÷', '-'])
    if (op === '÷') {
      // 这根上诉 1位数乘2两位的做法一样！
      const right = random(2, 9)
      const result = random(Math.floor(100 / right), Math.floor(999 / right))
      const left = result * right
      return `${left}${op}${right}=${result}`
    }
    else {
      const result = random(91, 99)
      const right = random(100 - result, 9)
      const left = result + right
      return `${left}${op}${right}=${result}`
    }
  }
  else {
    // 1和3都有运算符
    // TODO: 过于复杂好像
    return '11+11=22'
  }
}

function main() {
  const results = []
  for (let i = 0; i < 100; i++) {
    results.push(generate())
  }
  require('fs').writeFileSync('./build/data.json', JSON.stringify(results, null, 2))
}

main()
