<template>
  <div>
  <app-header></app-header>
  <div>{{ name }}</div>
  <appFooter></appFooter>
  </div>
</template>

<script>
  import appFooter from './components/footer.vue'

  export default {
    data() {
      return {
        name: "Francis"
      }
    },
    components: {
      appFooter
    }
  };

</script>

<style>

</style>