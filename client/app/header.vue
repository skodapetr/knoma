<template>
  <v-toolbar
    color="green"
    dark
    fixed
    app>
    <v-toolbar-title>KnoMa</v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        :to="{'name':'document-list'}"
        flat>
        Documents
      </v-btn>
    </v-toolbar-items>
    <v-spacer/>
  </v-toolbar>
</template>

<script>
  export default {
    "name": "app-header",
    "data": () => ({})
  }
</script>