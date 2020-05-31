<template lang="pug">
  #app
    router-view
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  html {
    font-family: sans-serif;
  }

  body {
    margin: 0;
  }

  html, body, #app {
    height: 100%;
  }
</style>
