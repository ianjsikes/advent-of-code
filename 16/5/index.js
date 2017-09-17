const fs = require('fs')
const crypto = require('crypto')

const data = 'ffykfhsq'
// const data = 'abc'

let password = ''

const md5 = (str) => {
  return crypto.createHash('md5').update(str).digest('hex')
}

let index = 0
while (password.length < 8) {

  while (!md5(data + index.toString()).startsWith('00000')) {
    index++
  }
  const hash = md5(data + index.toString())
  const char = hash[5]
  password += char
  index++
}

console.log(password)