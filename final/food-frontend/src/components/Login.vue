<template>

    <div class="login">
      <p>Username</p>
      <input type="text" v-model="username" placeholder="Username" required>

      <input type="password" v-model="password" placeholder="Password" required minlength="3">
      <p>The password must be > 4 char</p>
      
      <input type="submit" value="Login" disabled>
      <input type="submit" value="Login" v-on:click="login()">
      <router-link to='signup' tag="rl" >Create account</router-link>
    </div>


</template>

<!--This is how you add css to Vue -->
<style scoped src="../css/login.css"></style>

<script>

import axios from 'axios'
import sha1 from 'sha1'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
    login() {

      axios({ method: 'GET', 'url': this.$root.$data.backendAddress + '/login/' + this.username.toLowerCase() + '/' + sha1(this.password)})
      .then(result => {
        console.log(result);
         if (result.data.successful) {
           console.log(result)
          //  App data props
           this.$root.$data.authenticated = true
           this.$root.$data.username = result.data.data.username
           this.$root.$data.name = result.data.data.name

           this.$router.push('/dashboard');
          //  this.$root.$data.events = new Object()

          // axios({ method: 'GET', 'url': this.$root.$data.backendAddress + '/loadlistings/' + this.$root.$data.username }).then(result => {
          //   if (this.isEmpty(result.data.events)) {
          //     console.log("here")
          //     this.$router.push('/dashboard')
          //   } 
          //   else {
          //     console.log(result.data.events)
          //     this.$root.$data.events = result.data.events
          //     var completed = 0;
          //     for (var i = 0; i < result.data.events.length; i++) {
          //       completed+=1
          //       if (result.data.events[i].event_time !== 'Time not chosen') {

          //         this.$root.$data.calendarEvents.push({title: result.data.events[i].event_name, start: new Date(result.data.events[i].event_time)})

          //         if (completed == result.data.events.length) {
          //           this.$router.push('/dashboard')
          //         } 

          //       } 
          //       else {
          //         if (completed == result.data.events.length) {
          //           this.$router.push('/dashboard')
          //         } 
          //       }
          //     }
          //   }
            
          // })
         } 
         else {
           window.alert('Login failed. Please try again')
         }
      }, error => {
        console.error(error)
      })

    }
  },
  beforeMount () {
    this.$root.$data.authenticated = false
    this.$root.$data.username = '',
    this.$root.$data.name = ''
  }
}

</script>

