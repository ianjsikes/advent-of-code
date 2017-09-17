const fs = require('fs')

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const isPossibleTriangle = (a, b, c) => {
  if ((a + b <= c) || (b + c <= a) || (c + a <= b)) return false
  return true
}

const tris = data.split('\n').map(str => {
  return str.split(' ').filter(x => x.length).map(n => parseInt(n))
}).reduce((acc, tri) => {
  return isPossibleTriangle(...tri) ? acc + 1 : acc
}, 0)

console.log(tris)
