const fs = require('fs')
const minimist = require('minimist')
const data = require('./answers.json')

const args = minimist(process.argv.slice(2))

// shuffle
function slice(start, length) {
  const name = `${start}-${start + length}.json`
  const result = data.slice(start, start + length)
  fs.writeFileSync(`./src/answers/data/${name}`, JSON.stringify(result, null, 2))
}

const [start, length] = args._

slice(start, length)
