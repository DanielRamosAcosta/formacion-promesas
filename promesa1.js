const fs = require('fs')

const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
  );

const fsp = {
  readdir: promisify(fs.readdir),
  stat: promisify(fs.stat)
}

function getSizeOfDir (path) {
  return Promise.resolve()
    .then(() => fsp.readdir(path))
    .then(files => files.map(file => fsp.stat(file)))
    .then(statsPromises => Promise.all(statsPromises))
    .then(stats => stats.map(stat => stat.size))
    .then(sizes =>
      sizes.reduce((totalSum, currentSize) =>
        totalSum + currentSize
      , 0)
    )
    .catch(err => {
      reject(err)
    })
}

getSizeOfDir('./')
  .then(data => {
    console.log('datos', data)
  })
  .catch(err => {
    console.error('hubo un error', err)
  })
