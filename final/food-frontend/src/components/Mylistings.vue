<template>

<div id="mylistings">
  <p class="heading">My Unclaimed Posts</p>

  <listing class="listing" v-for="(listing, index) in mylistings" :key="index" v-if="listing.owner === username && listing.claimed == false">

    <p class="listHeading">{{listing.item}}</p>
    <p class="attrib"><strong>Count:</strong>{{listing.count}}</p>
    <p class="attrib"><strong>Owner:</strong>{{listing.owner}}</p>

  </listing>

  <p class="heading">Food I Claimed</p>

  <listing class="listing" v-for="(listing, index) in mylistings" :key="index" v-if="listing.owner != username && listing.claimed == true">

  <p class="listHeading">{{listing.item}}</p>
  <p class="attrib"><strong>Count:</strong>{{listing.count}}</p>
  <p class="attrib"><strong>Owner:</strong>{{listing.owner}}</p>

  </listing>



</div>


</template>

<script>
  import listing from './Listing.vue';
  import axios from 'axios';


  export default {
    data() {
      return {
        mylistings: [],
        username: this.$root.$data.username
      }
    },
    beforeMount() {
      axios({ method: 'GET', 'url': this.$root.$data.backendAddress + '/loadlistings/' + this.$root.username.toLowerCase()}).then(result => {
      console.log("LOADING LISTINGS");
      console.log(result);

      this.mylistings = result.data.data.mylistings;

      // this.$root.$data.mylistings = result.data.data.mylistings;

      });
    }
  }


</script>

<style scoped type="text/css">
  #mylistings {
    min-width: 200px;
    height: 100%;
    position: relative;
    float: left;
    background-color:rgb(110, 179, 110);
  }

  .heading {
    margin-left: 5px;
    margin-top: 15px;
    font-size: 26px;
    font-weight: bold;
  }

  .listing {
    font-family: 'Roboto', 'sans-serif';
    margin: 15px;
    margin-left: 20px;
    border-radius: 20px;
    width: 200px;
    height: 100px;
    background-color: #dbdbdb;
  }

  .listHeading {
    margin-left: 30%;
    font-size: 18px;
    font-weight: bold;
  }

  .attrib {
    margin: 0px;
    margin-left: 10px;
  }


</style>