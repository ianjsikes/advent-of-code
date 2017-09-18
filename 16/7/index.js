const fs = require('fs')

const data = fs.readFileSync(__dirname + '/input.txt', 'utf8')

const makeIp = (str) => {
  const sections = str.match(/\]?\w*\[?/g)
  const ip = {
    chunks: [],
    hyperchunks: [],
  }
  for(const section of sections) {
    if (section.startsWith(']') || section.endsWith('[')) {
      ip.chunks.push(section.replace(/[\[\]]/g, ''))
    } else {
      ip.hyperchunks.push(section)
    }
  }
  return ip
}

const isABBA = (four) => {
  return four.length === 4
    && four[0] === four[3]
    && four[1] === four[2]
    && four[0] !== four[1]
}

const hasABBA = (str) => {
  if (str.length < 4) { return false }
  
  for (let i = 0; i < str.length - 3; i++) {
    if (isABBA(str.slice(i, i+4))) {
      return true
    }
  }

  return false
}

const supportsTLS = (ip) => {
  for (const hyperchunk of ip.hyperchunks) {
    if (hasABBA(hyperchunk)) {
      return false
    }
  }

  for (const chunk of ip.chunks) {
    if (hasABBA(chunk)) {
      return true
    }
  }

  return false
}

const ips = data.split('\n').map(makeIp)
const tlsIps = ips.filter(supportsTLS)

console.log(tlsIps.length)


