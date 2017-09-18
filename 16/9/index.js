const fs = require('fs')

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let decompressedLength = 0

for (let i = 0; i < data.length; i++) {
  if (data[i] !== '(') {
    decompressedLength++
  } else {
    
  }
}