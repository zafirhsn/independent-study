<template>

<div class="listing">
   <slot></slot>
</div>
  

</template>



<script>
  export default {
    name: "Listing",

  }

</script>

<style scoped type="text/css">
  
  div.listing {
    margin-top: 10px;
    margin-bottom: 10px;

    min-width: 150px;
    height: 150px;
    border-radius: 20px;
    border-color: rgb(10, 156, 10);
    border-width: 5px;
    background-color: #dbdbdb;
  }






</style>