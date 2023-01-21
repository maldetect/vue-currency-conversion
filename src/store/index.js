import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_API_URL

export default new Vuex.Store({
  state: {
    user: null
  },

  mutations: {
    text(){

    },
    setUserData (state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common.Authorization = `Bearer ${userData.access_token}`
    },

    clearUserData () {
      localStorage.removeItem('user')
      location.reload()
    }
  },

  actions: {
    login ({ commit }, credentials) {
      return axios
        .post('/api/login', credentials)
        .then(({ data }) => {
          commit('setUserData', data.data)
        })
    },

    logout ({ commit }) {
      commit('clearUserData')
    },
    submit({commit}, data) {
      commit('text');
      return axios.post('/api/register', data)
    },
  
  },

  getters : {
    isLogged: state => !!state.user
  }
})
