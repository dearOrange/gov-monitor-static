import Mock from 'mockjs'

function loginMock(...args) {
  console.log(args)
  // TODO
  return Mock.mock({
    code: 0,
    name: '@cname'
  })
}

Mock.mock(/\/login\/validate\.do/, 'post', loginMock)
