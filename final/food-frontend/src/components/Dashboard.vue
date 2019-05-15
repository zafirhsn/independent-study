<template>
  <div id="dashboard">
    <Header></Header>
    <br>
    <br>
    <Mylistings></Mylistings>

    <listing class=listing v-for="(listing, index) in alllistings" :key="index" v-if="listing.claimed == false">
      <p class="heading">{{listing.item}}</p>
      <p class="attrib"><strong>Count:</strong> {{listing.count}} </p>
      <p class="attrib"><strong>Owner:</strong> {{listing.owner}} </p>
      <b-button class="claim-button" variant="success" @click="claimItem(listing.owner, listing.item, listing.count)">Claim</b-button>
    </listing>
      

      
  </div>

</template>

<script>

  import axios from 'axios';
  import listing from './Listing.vue';
  import Header from './Header.vue';
  import Mylistings from './Mylistings.vue';

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
      },
      claimItem(owner, item, count) {
        console.log("send reqeust to claim item");
        console.log(owner, item, count);
        console.log(typeof count);

        if (this.$root.$data.username === owner) {
          window.alert("You can not claim your own listing");
        }

        else {
          axios({ method: 'GET', 'url': this.$root.$data.backendAddress + '/claimitem/' + this.$root.username.toLowerCase() + '/' + owner + '/' + item + '/' + count}).then(result => {
            console.log(result);
            if (result.data.successfull) {
              window.alert("You've successfully claimed this item");
            
            }
          });
        }
      }
    },
    beforeMount() {
      axios({ method: 'GET', 'url': this.$root.$data.backendAddress + '/loadlistings/' + this.$root.username.toLowerCase()}).then(result => {
        console.log("LOADING LISTINGS");
        console.log(result);

        this.mylistings = result.data.data.mylistings;
        this.alllistings = result.data.data.alllistings;

        this.$root.$data.alllistings = result.data.data.alllistings;
        this.$root.$data.mylistings = result.data.data.mylistings;

      });
    },
    components: {
      listing,
      Header,
      Mylistings
    }
  }

</script>

<style scoped type="text/css"> 
  #dashboard {
    height: 100%;    
  }

  .listing {
    margin-left: 30%;
    margin-right: 10%;
  }

  @media only screen and (max-width: 600px) {
    .listing {
      width: 50%;
    }
  }

  .heading {
    font-weight: 700;
    margin-left: 40%;
    font-size: 20px;
    padding-top: 5px;
  }

  .attrib {
    margin: 0;
    margin-left: 10px;
  }

  .claim-button {
    margin-left: 70%;
  }


</style>
