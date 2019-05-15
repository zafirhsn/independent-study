<template></template>

<script>

export default {
  name: 'Home',
  mounted() {
    if(this.$root.$data.authenticated) {
        this.$router.replace({ name: "dashboard" });
    } else {
        this.$router.replace({ name: 'login' })
    }
  }
}
</script>