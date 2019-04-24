export { default as validPassword } from './password'
export { default as validVCode } from './vcode'
export { default as validUserName } from './username'

export function withValidator(validFn, errorMsg = '该字段错误') {
  return function(rule, value, callback, source, options) {
    if (validFn(value)) {
      return callback()
    } else {
      callback(new Error(errorMsg))
    }
  }
}
