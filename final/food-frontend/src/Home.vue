<template></template>

<script>

export default {
  name: 'Home',
  mounted() {
    if(this.$root.$data.authenticated) {
        this.$router.replace({ name: "Dashboard" });
    } else {
        this.$router.replace({ name: 'Login' })
    }
  }
}
</script>