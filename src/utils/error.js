import { Message, MessageBox } from 'element-ui'
import { isFunction } from '@utils/is'
import router from '@/router'
// Message.error({
//   message: `服务端[${status}]错误!`,
//   showClose: true
// })
let ERROR_CODE = {
  '1002': {
    message: function(data) {
      showUnloginError(data.message)
    }
  },
  '404': { message: '[404]错误' },
  '500': { message: '[500]错误' }
}

function showCommonError(msg) {
  return Message.error({
    message: `${msg}`,
    showClose: true
  })
}

let showUnloginError = (function _IIFE() {
  let dialogPromise
  return function innerFn(msg) {
    // 如果系统不支持Promise, 可能有问题 TODO
    if (dialogPromise && dialogPromise.then) {
      return
    }
    dialogPromise = MessageBox.alert(msg, '温馨提示', {
      confirmButtonText: '确定',
      callback: action => {
        if (action) {
          router.push('/')
        }
        dialogPromise = null
      }
    })
    // dialogPromise.then(
    //   () => {
    //     dialogPromise = null
    //   },
    //   () => {
    //     dialogPromise = null
    //   }
    // )
  }
})()

// function showUnloginError(msg) {
//   // 保证只有允许一个提示框出现
//   // MessageBox.close()
//   MessageBox.alert(msg, '温馨提示', {
//     confirmButtonText: '确定',
//     callback: action => {
//       if (action) {
//         router.push('/')
//       }
//     }
//   })
// }

export function showErrorMessage(code, data = {}) {
  let { message } = ERROR_CODE[code]
  if (message) {
    if (isFunction(message)) {
      // 是函数
      return message(data)
    } else {
      // 是字符串
      return showCommonError(message)
    }
  }
}
