<template>
  <form>
    <div class="input-container">
      <label for="username">Username</label>
      <input v-validate="'required'" type="text" name="username" v-model="userName" id="username">
      <span v-show="errors.has('username')">{{ errors.first('username') }}</span>
    </div>
    <div class="input-container">
      <label for="password">Password</label>
      <input v-validate="'required'" type="text" name="password" v-model="password" id="password">
      <span v-show="errors.has('password')">{{ errors.first('password') }}</span>
    </div>
    <input type="button" value="Login" @click="login">
    <div>
      {{responseStatus}}
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
      userName: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$validator.validateAll().then(result => {
        if (result) {
          axios({
            url: 'http://localhost:3000/login',
            method: 'POST',
            withCredentials: false,
            data: {
              userName: this.userName,
              password: this.password
            },
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then((response) => {
              let data = response.data
              if (data.status === 'SUCCESS') {
                router.push('file')
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
form {
  text-align: center;

  .input-container {
    > span {
      display: block;
      color: red;
    }
  }
}
</style>
