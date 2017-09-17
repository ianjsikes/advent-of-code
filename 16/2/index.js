const fs = require('fs')

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const keypad = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
]

const clamp = (val, low, high) => Math.max(low, Math.min(high, val))

const sequences = data.split('\n')

const me = {
  pos: { x: 0, y: 0 },
  key: () => {
    return keypad[me.pos.y][me.pos.x]
  },
  bound: () => {
    me.pos.x = clamp(me.pos.x, 0, 2)
    me.pos.y = clamp(me.pos.y, 0, 2)
  },
  U: () => me.pos.y--,
  D: () => me.pos.y++,
  L: () => me.pos.x--,
  R: () => me.pos.x++,
}

const solution = sequences.map((seq) => {
  seq.split('').forEach((dir) => {
    me[dir]()
    me.bound()
  })
  return me.key()
})

console.log(solution.join(''))
