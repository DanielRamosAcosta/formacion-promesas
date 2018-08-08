const setTimeoutPromised = ms =>
  new Promise(resolve => setTimeout(resolve, ms))

const p1 = setTimeoutPromised(1000)
  .then(() => console.log("He esperado 1s"))

const p2 = setTimeoutPromised(2000)
  .then(() => console.log("He esperado 2s"))

const p3 = setTimeoutPromised(3000)
  .then(() => console.log("He esperado 3s"))

const promise = Promise.all([p1, p2, p3])

console.log("antes del .then final")
promise
  .then(() => {
    console.log("He terminado todo")
  })
