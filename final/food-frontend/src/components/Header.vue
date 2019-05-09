<template>
    <div>
        <button class="btn logout" type="button" v-on:click="logout()">Logout</button>
       
        <router-link to='settings' tag="rl" class='btn'>Settings</router-link>

        <router-link to='schedule' tag="rl" class='btn'>Schedule</router-link>

        <router-link to='createlisting' tag="rl" class='btn'>Create Listing</router-link>

        <button v-on:click="loadDashboard()" tag="rl" class='btn'>Dashboard</button>
    </div>
</template>


<!--This is how you add css to Vue -->
<!-- <style scoped src="../css/header.css"></style> -->

<script>

import axios from 'axios'

export default {
    name: 'Header',
    data() {
        return {
            size: '24px'
        }
    },
    methods: {
      logout() {
          this.$root.$data.authenticated = false
          this.$root.$data.username = ''
          this.$router.push('/login')
          this.$root.$data.calendarEvents = []
      },
      loadDashboard() {
            this.$root.$data.calendarEvents = []

          axios( { method: 'GET', 'url': this.$root.$data.backendAddress + '/loadevents/' + this.$root.$data.username } )
          .then(result => {
              console.log(result)
              if (result.data.message === 'no events found') {
                this.$root.$data.events = result.data.events
                this.$router.push('/dashboard')
              } else {
                this.$root.$data.events = result.data.events
                var completed = 0;
                for (var i = 0; i < result.data.events.length; i++) {
                completed+=1
                if (result.data.events[i].event_time !== 'Time not chosen') {
                    this.$root.$data.calendarEvents.push({title: result.data.events[i].event_name, start: new Date(result.data.events[i].event_time)})
                    if (completed == result.data.events.length) {
                    this.$router.push('/dashboard')

                    } 
                } else {
                    if (completed == result.data.events.length) {
                    this.$router.push('/dashboard')

                    } 
                }

                }
              }
            
          })
      }
  }
}
</script>
