<template>
    <div id="header">
        <button class="btn logout" type="button" v-on:click="logout()">Logout</button>
       
        <router-link to='settings' tag="rl" class='btn'>Settings</router-link>

        <router-link to='schedule' tag="rl" class='btn'>Schedule</router-link>

        <router-link to='createlisting' tag="rl" class='btn'>Create Listing</router-link>

        <router-link to="dashboard" class="btn">Dashboard</router-link>
    </div>
</template>


<!--This is how you add css to Vue -->
<style scoped src="../css/header.css"></style>

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
          this.$root.$data.username = '';
          this.$root.$data.name = '';
          this.$root.$data.mylistings = [];
          this.$root.$data.alllistings = [];
          this.$router.push('/login');

      }
  }
}
</script>
