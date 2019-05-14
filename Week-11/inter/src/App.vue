<template>
    <div>
        <app-header></app-header>
        <div class="container">
            <compUserProfile
                :userName="name"
                :userLastname="lastname"
                :userAge="age"
                :userParents="parents"
                @updateName="name = $event"
                :updateLastname="updateLastname"
            />
            <compFriends/>
        </div>
        
        <compFooter/>
    </div>
</template>

<script>
    import compFooter from './Components/Header_footer/Footer.vue';
    import compUserProfile from './Components/User/Profile.vue';
    import compFriends from './Components/User/Friends.vue';

    export default {
        data(){
            return {
                name: "Francis",
                lastname: "Jones",
                age:25,
                parents:{
                    mother:"Martha",
                    father:"Mario"
                }
            }
        },
        methods:{
            updateLastname(value){
                this.lastname = value
            }
        },
        components:{
            compFooter,
            compUserProfile,
            compFriends
        }
    }
</script>

<style>
  body {
      padding:0;
      margin:0;
      font-family: 'Roboto', sans-serif;
  }
  .container {
      min-height: 84vh;
      box-sizing: border-box;
      padding:20px;
  }


</style>