export function partial(fn, ...args) {
  return function(...resetArgs) {
    return fn(...[...args, ...resetArgs])
  }
}

export function partialObj(fn, obj1) {
  return function(obj2) {
    return fn({
      ...obj1,
      ...obj2
    })
  }
}
