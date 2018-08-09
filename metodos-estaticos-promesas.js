// Promise.all
// Promise.resolve
// Promise.reject
// Promise.race
// Promise#finally

const setTimeoutPromised = ms => new Promise(r => setTimeout(r, ms))

Promise.race([
  setTimeoutPromised(1000).then(() => 1000),
  setTimeoutPromised(2000).then(() => 2000),
  setTimeoutPromised(3000).then(() => 3000)
])
.finally(valueOrError=> {
  console.log(valueOrError)
})
