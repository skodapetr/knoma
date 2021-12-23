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
        class="mr-6"
        text
      >
        Documents
      </v-btn>
      <v-btn
        :to="{'name':'about'}"
        class="mr-6"
        text
      >
        About
      </v-btn>
      <v-btn
        href="https://github.com/skodapetr/knoma/issues"
        rel="noopener noreferrer"
        target="_blank"
        text
      >
        GitHub
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <notifications />
  </v-app>
</template>

<script>
export default {
  "name": "Application",
};
</script>
