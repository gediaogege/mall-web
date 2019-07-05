const getters = {
  token: function (state) {
    return state.user.token
  },
  username:function (state) {
    return state.user.username
  }
}
export default getters
