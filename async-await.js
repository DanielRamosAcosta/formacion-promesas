const fs = require('fs')

const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
  );

const fsp = {
  readdir: promisify(fs.readdir),
  stat: promisify(fs.stat)
}

async function getSizeOfDir (path) {
  const files = await fsp.readdir(path)

  const promises = files.map(async file => {
    await fsp.stat(file).then(stat => stat.size)
  })

  const sizes = await Promise.all(promises)

  return sizes.reduce((totalSum, currentSize) =>
    totalSum + currentSize
  , 0)
}

getSizeOfDir('./')
  .then(data => {
    console.log('datos', data)
  })
  .catch(err => {
    console.error('hubo un error', err)
  })
