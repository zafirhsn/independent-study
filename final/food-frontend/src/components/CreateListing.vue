<template>
    <div>
        <Header></Header>
        <div class="creationContainer">
            <div class="popOut">
            <h2>Item Name:</h2>
            <input type="text" v-model="item_name" placeholder="Item Name" />
            <h2>Count:</h2>
            <input type="text" v-model="count" placeholder="Number of items"/>

        <br>
        <br>
            <button type="button" v-on:click="createListing()">Create Listing</button>
        </div>
        </div>

    </div>
</template>



<script>

import Header from '../components/Header'
import axios from 'axios'

export default {
    name: 'CreateListing',
    data() {
        return {
            item_name: '',
            count: 0,
            claimed: false,
            owner: this.$root.$data.username
        }
    },
    methods: {
        createListing() {

            axios( { method: 'GET', 'url': this.$root.$data.backendAddress + '/createlisting/' + this.owner + '/' +  this.item_name + '/' + this.count})
            .then(result => {
                console.log(result)

                if (result.data.successfull) {
                    window.alert("Successfully created listing ")
                    this.$router.push('/dashboard')
                } else {
                    window.alert("Event creation failed")
                }
            })
        }
    },
    components: {
        Header
    },
    beforeMount() {
        if (!this.$root.$data.authenticated) {
            this.$router.push('/login')
        }
    }
}

</script>

<style type="text/css">

.creationContainer{
    text-align: center;
    display: inline-block;
    width: 100%;
}

.creationContainer h2{
    margin-bottom: 0px;
    font-size: 20px;
}

.container{
    display: inline-block;
}

.container .selected-date{
    display: inline-block;
    text-align: center;
}

.popOut{
    display: inline-block;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    padding: 20px;
    padding-top: 0px;
    background-color: white;
    margin-top: 5px;
}

.popOut button{
    margin-top: 5px;
    background-color: #268fff;
    color: white;
    border: none;
    border-radius: 3px;
    width: 50%;
    height: 30px;
    font-size: 15px;
    cursor: pointer;
}

.popOut button:hover{
    background-color: #2867cc;
}


</style>

<style scoped type="text/css">
    .addUser {
        background-color: #f9c422;
        font-size: 12px;
        font-weight: bold;
        width: 40%;
        margin-bottom: 10px;
    }
    .addUser:hover{
        background-color: #edb407;
    }

    .deleteUser{
        width: 15%;
        background-color: #dc3545;
        font-size: 12px;
        font-weight: bold;
        margin-left: 2px;
    }
    .deleteUser:hover{
        background-color: #c91021;
    }

    .userChange{
        display: inline-block;
        margin-bottom: 10px;
    }
    .userInfo{
        width: 110%;
    }
</style>