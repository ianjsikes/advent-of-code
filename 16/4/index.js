const fs = require('fs')

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const makeRoom = (str) => {
  return {
    name: str.match(/((\w*)-)*/)[0],
    sector: parseInt(str.match(/\d\d\d/)[0]),
    checksum: str.match(/\[(.*)\]/)[1]
  }
}

const isRealRoom = (room) => {
  const freq = {}
  room.name.split('').forEach((c) => {
    if (c === '-') { return }
    if (!freq[c]) { freq[c] = 0 }
    freq[c]++
  })

  const arr = []
  Object.entries(freq).forEach(ent => {
    if (!arr[ent[1]]) {
      arr[ent[1]] = []
    }
    arr[ent[1]].push(ent[0])
  })

  arr.forEach(sub => sub.sort())

  // arr.forEach(sub => sub.join(''))
  const val = arr.reduce((acc, sub) => [...acc, ...sub.reverse()], [])
    .reverse()
    .join('')
    .slice(0, 5)
  
  return val === room.checksum
}

const rooms = data.split('\n').map(makeRoom)

const realRooms = rooms.filter(isRealRoom)

const sumOfSectorIds = realRooms.reduce((sum, room) => sum + room.sector, 0)
console.log(sumOfSectorIds)
