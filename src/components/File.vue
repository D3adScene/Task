<template>
  <form>
    <div>{{responseStatus}}</div>
    <input type="button" value="Start" @click="startWatching">
    <input type="button" value="Status" @click="getStatus">
    <input type="button" value="Stop" @click="stopWatching">
    <input type="button" value="Logout" @click="logout">
    <div>
      {{logs}}
    </div>
  </form>
</template>
<script>
import axios from 'axios'
import router from '@/router'

export default {
  name: 'Login',
  data () {
    return {
      responseStatus: '',
      logs: '',
      filePath: ''
    }
  },
  methods: {
    logout () {
      axios({
        url: 'http://localhost:3000/logout',
        method: 'POST',
        withCredentials: false,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    stopWatching () {
      axios({
        url: 'http://localhost:3000/stop',
        method: 'GET',
        withCredentials: false,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          let data = response.data
          if (data.status === 'SUCCESS') {
            this.logs = ''
          } else this.responseStatus = data.reason
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getStatus () {
      axios({
        url: 'http://localhost:3000/status',
        method: 'GET',
        withCredentials: false,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          let data = response.data
          if (data.status === 'SUCCESS') {
            if (response.data.data.length) {
              this.logs = response.data.data
            } else {
              this.logs = ''
            }
          } else this.responseStatus = data.reason
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    startWatching () {
      this.$validator.validateAll().then(result => {
        if (result) {
          axios({
            url: 'http://localhost:3000/start',
            method: 'POST',
            withCredentials: false,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then((response) => {
              let data = response.data
              if (data.status === 'SUCCESS') {
              } else this.responseStatus = data.reason
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
