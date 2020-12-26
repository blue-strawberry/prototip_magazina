<template>
  <div id="app">
    <v-main-wrapper></v-main-wrapper>
  </div>
</template>

<script>

import vMainWrapper from './components/v-main-wrapper'

export default {
  name: 'App',
  components: {
    vMainWrapper
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  color: grey;
}

#app .titles {
  font-weight: bold;
  margin: none;
}

#app .comments {
  color: red;
  font-size: 9px;
}

#app .makered {
  border-color: red;
  border-radius: 2px;
}

#app button {
  background-color: white;
  border-radius: 4px;
  display: block;
  margin-top: 10px;
  padding: 5px;
}
</style>
