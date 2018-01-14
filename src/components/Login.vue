<template>
  <form>
    <label for="username">Username</label>
    <input v-validate="'required'" type="text" name="username" v-model="userName" id="username">
    <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
    <label for="password">Password</label>
    <input v-validate="'required'" type="text" name="password" v-model="password" id="password">
    <input type="button" value="Login" @click="login">
    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
  </form>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
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
            .then(function (response) {
              console.log(response)
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