<template>
  <v-app>
    <v-app-bar
      color="#0000ff"
      dark
      app
    >
      <v-toolbar-title>
        Knowledge Manager
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        :to="{'name':'documents'}"
        text
        class="mr-6"
      >
        Documents
      </v-btn>
      <v-btn
        :to="{'name':'about'}"
        text
      >
        About
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <notifications/>
  </v-app>
</template>

<script>
export default {
  "name": "Application",
};
</script>
