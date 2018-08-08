const fs = require('fs')

function readdirPromised (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}

function statPromised (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
}

const fsp = {
  readdir: readdirPromised,
  stat: statPromised
}

function getSizeOfDir (path) {
  return readdirPromised(path)
    .then(files => files.map(file => statPromised(file)))
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
