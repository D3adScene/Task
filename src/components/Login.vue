<template>
    <form>
        <label for="username">Username</label>
        <input type="text" name="username" v-model="userName" id="username">
        <label for="password">Password</label>
        <input type="text" name="password" v-model="password" id="password">
        <input type="button" value="Login" @click="login">
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
      axios({
        method: 'post',
        url: 'http://localhost:3000/login',

        withCredentials: false
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>