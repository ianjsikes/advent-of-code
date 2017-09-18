const fs = require('fs')

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const rotate = (arr, reverse) => {
  if (reverse) {
    arr.push(arr.shift())
  } else {
    arr.unshift(arr.pop())
  }
  return arr
}

class Screen {
  constructor (width, height) {
    this.width = width
    this.height = height
    this.data = []
    for (let y = 0; y < height; y++) {
      this.data.push([])
      for (let x = 0; x < width; x++) {
        this.data[y].push(0)
      }
    }
  }

  getRow(r) {
    return [...this.data[r]]
  }

  getCol(c) {
    return this.data.map(row => row[c])
  }

  setRow(r, arr) {
    this.data[r] = arr
  }

  setCol(c, arr) {
    this.data.forEach((row, i) => row[c] = arr[i])
  }

  litPixels() {
    return this.data.reduce((sum, row) => {
      return sum + row.reduce((rowSum, val) => rowSum + val, 0)
    }, 0)
  }

  rect(w, h) {
    for (let y = 0; y < h && y < this.height; y++) {
      for (let x = 0; x < w && x < this.width; x++) {
        this.data[y][x] = 1
      }
    }
  }

  rotateRow(r, amt) {
    let row = this.getRow(r)
    let reverse = false
    if (amt < 0) {
      reverse = true
      amt = Math.abs(amt)
    }
    for (let i = 0; i < amt; i++) {
      rotate(row, reverse)
    }
    this.setRow(r, row)
  }

  rotateCol(c, amt) {
    let col = this.getCol(c)
    let reverse = false
    if (amt < 0) {
      reverse = true
      amt = Math.abs(amt)
    }
    for (let i = 0; i < amt; i++) {
      rotate(col, reverse)
    }
    this.setCol(c, col)
  }
}

const parseInstruction = (str) => {
  const instruction = {
    type: '', // rect || rotateRow || rotateCol
    vals: str.match(/\d+/g),
  }

  if (str.startsWith('rect')) {
    instruction.type = 'rect'
  } else
  if (str.startsWith('rotate row')) {
    instruction.type = 'rotateRow'
  } else
  if (str.startsWith('rotate col')) {
    instruction.type = 'rotateCol'
  } else {
    throw new Error('Unknown instruction type')
  }

  return instruction
}

const screen = new Screen(50, 6)

const instructions = data.split('\n').map(parseInstruction)

instructions.forEach((instruction) => {
  screen[instruction.type](...instruction.vals)
})

console.log(screen.litPixels())