const fs = require('fs')

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const words = data.split('\n')
const freqs = [{},{},{},{},{},{},{},{}]
words.forEach(word => {
  word.split('').forEach((letter, index) => {
    if (!freqs[index][letter]) {
      freqs[index][letter] = 0
    }
    freqs[index][letter]++
  })
})

message = ''

freqs.forEach(freq => {
  const sortedFreq = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
  message += sortedFreq[0][0]
})

console.log(message)