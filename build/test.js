function main() {
  const result = []
  // 等号在第四位
  equalIn4(result)
  // equalIn5(result)
  // require('fs').writeFileSync('./build/data.json', JSON.stringify(result, null, 2))
}

function equalIn4(result) {
  // 加法
  for (let i = 91; i < 100; i++) {
    for (let j = 100 - i; j < 10; j++) {
      result.push(`${i}+${j}=${i + j}`)
      result.push(`${j}+${i}=${i + j}`)
    }
  }

  // 乘法
  for (let i = 2; i < 10; i++) {
    const min = Math.floor(100 / i)
    const max = Math.floor(999 / i)
    for (let j = min; j <= max; j++) {
      result.push(`${i}×${j}=${i * j}`)
      result.push(`${j}×${i}=${i * j}`)
    }
  }
}

function equalIn5(result) {
  // 两位和两位等于两位
  // -
  for (let i = 10; i < 90; i++) {
    for (let j = i + 10; j < 100; j++) {
      result.push(`${j}-${i}=${j - i}`)
    }
  }
  // +
  for (let i = 10; i < 90; i++) {
    for (let j = 10; j < 100 - i; j++) {
      result.push(`${i}+${j}=${i + j}`)
      result.push(`${j}+${i}=${i + j}`)
    }
  }

  // 三位和一位等于两位
  // -
  for (let i = 91; i < 100; i++) {
    for (let j = 100 - i; j < 10; j++) {
      result.push(`${i + j}+${j}=${i}`)
    }
  }

  // 除法
  for (let i = 2; i < 10; i++) {
    const min = Math.floor(100 / i)
    const max = Math.floor(999 / i)
    for (let j = min; j <= max; j++) {
      result.push(`${i * j}/${i}=${j}`)
    }
  }

  // 一位和三位
  // 16种组合
  // 3个个位数，两个运算符，得出2位数
}

main()
