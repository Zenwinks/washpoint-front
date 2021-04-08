import createPersistedState from 'vuex-persistedstate'

export const store = {
  state: {
    newSnack: {
      'type': 'success',
      'text': ''
    },
  },
  plugins: [createPersistedState()],
  getters: {
    getSnackbar(state) {
      return state.newSnack
    }
  },
  mutations: {
    setSnackBar(state, newSnack) {
      state.newSnack.type = newSnack.type
      state.newSnack.text = newSnack.text
      if (newSnack.type === 'success') {
        setTimeout(function () {
          state.newSnack.text = ''
        }, 8000)
      }
    }
  },
  actions: {
    setSnackBar({commit}, newState) {
      commit('setSnackBar', newState)
    }
  }
}
