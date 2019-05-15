<template>
  <div>
    <Header></Header>
    <strong>Dashboard </strong>
    <listing v-for="(listing, index) in alllistings" :key="index" :alllisting="alllistings"></listing>
      
    <b-button>Button</b-button>
      
  </div>

</template>

<script>

  import axios from 'axios';
  import listing from './Listing.vue';
  import Header from './Header.vue';

  export default {
    name: "Dashboard",
    data() {
      return {
        mylistings: [],
        alllistings: []
      }
    },
    methods: {
      isEmpty(obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) return false;
        }
        return true;
      }
    },
    beforeMount() {
      axios({ method: 'GET', 'url': this.$root.$data.backendAddress + '/loadlistings/' + this.$root.username.toLowerCase()}).then(result => {
        console.log(result);

        this.mylistings = result.data.data.mylistings;
        this.alllistings = result.data.alllistings;

      });
    },
    components: {
      listing,
      Header
    }
  }

</script>