/* eslint-disable no-debugger */
import { SAVE_USER, GET_USER_INFO } from '@/store/types'

import UserApi from '@/api/home'

export default {
  async [GET_USER_INFO]({ commit }) {
    let userResponse
    let {
      success,
      data: { data }
    } = (userResponse = await UserApi.fetchAllData())
    if (success) {
      commit(SAVE_USER, data)
    }
    return userResponse
  }
}
