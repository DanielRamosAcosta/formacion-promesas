const fs = require('fs')

function getSizeOfDir (path, callback) {
  console.log('1.5')
  fs.readdir(path, (err, files) => {
    if (err) {
      return callback(err)
    }
    console.log('3')

    let totalFileSizes = 0
    let lookedFiles = 1

    files.forEach(file => {
      console.log('iteracion fichero:', file)
      // filesytem statistics
      fs.stat(file, (err, dataFile) => {
        console.log('datos del fichero:', file)
        if (err) {
          return callback(err)
        }
        totalFileSizes += dataFile.size
        if (lookedFiles  < files.length) {
          lookedFiles += 1
        } else {
          callback(null, totalFileSizes)
        }
      })
    })

    // console.log(files)
    // cb(null, 23)
  })
}

console.log('1')
getSizeOfDir('./', (err, data) => {
  console.log('Hubo algun error?', err)
  console.log('datos', data)
})

console.log('2')
