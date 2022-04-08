function main() {
  const result = []
  // 等号在第四位
  equalIn4(result)
  equalIn5(result)
  require('fs').writeFileSync('./build/data.json', JSON.stringify(result, null, 2))
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

  const op = ['÷', '-', '*', '/']

  // 一位和三位
  // 16种组合
  // 3个个位数，两个运算符，得出2位数
  // 结果
  for (let i = 10; i < 100; i++) {
    // 三个位的数
    for (let j = 100; j < 1000; j++) {
      // 第一个符号
      for (let k = 0; k < op.length; k++) {
        for (let t = 0; t < op.length; t++) {
          const str = String(j)
          const exp = `${str[0]}${op[k]}${str[1]}${op[t]}${str[2]}`
          try {
            // eslint-disable-next-line no-eval
            const res = eval(exp)
            if (res === i) {
              result.push(`${exp}=${i}`)
            }
          }
          catch (error) {
          }
        }
      }
    }
  }
}

// function equalIn6(result) {
//   // 三位数 和 两位数 得一位数
//   // -
//   for (let i = 100; i < 109; i++) {
//     for (let j = i - 9; j < 100; j++) {
//       result.push(`${i}-${j}=${i - j}`)
//     }
//   }
//   // 除
//   for (let i = 100; i < 999; i++) {
//     for (let j = 2; j < 10; j++) {
//       const res = Math.floor(i / j)
//       if (res >= 10 && res < 100 && (res * j === i)) {
//         result.push(`${i}/${res}=${j}`)
//       }
//     }
//   }

//   //
// }

main()
