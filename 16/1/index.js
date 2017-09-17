const fs = require('fs')

const directions = [
  { x: 0, y: 1 }, // north
  { x: 1, y: 0 }, // east
  { x: 0, y:-1 }, // south
  { x:-1, y: 0 }, // west
]

const makeInstruction = (str) => {
  return {
    direction: str[0] === 'R' ? 1 : -1,
    distance: parseInt(str.slice(1)),
    str,
  }
}

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const me = {
  dir: 0,
  pos: { x: 0, y: 0 }
}

const instructions = data.split(', ').map(makeInstruction)

instructions.forEach((i) => {
  me.dir += i.direction
  if (me.dir < 0) { me.dir = 3 }
  me.dir %= 4

  const dir = directions[me.dir]
  me.pos.x += (dir.x * i.distance)
  me.pos.y += (dir.y * i.distance)
})

console.log(Math.abs(me.pos.x) + Math.abs(me.pos.y), 'blocks away')
