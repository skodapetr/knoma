<template>
  <v-app-bar
    color="green"
    dark
    app
  >
    <v-toolbar-title class="title">
      KnoMa
    </v-toolbar-title>
    <v-btn
      :to="{'name':'document-list'}"
      text
    >
      Documents
    </v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    "name": "app-header",
    "data": () => ({})
  }
</script>

<style scoped>
  .title {
    margin-right: 1rem;
  }
</style>