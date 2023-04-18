<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        Knowledge Manager
      </v-app-bar-title>
      <v-spacer />
      <v-btn
        :to="{'name':'documents'}"
        class="mr-6"
      >
        Documents
      </v-btn>
      <v-btn
        :to="{'name':'about'}"
        class="mr-6"
      >
        About
      </v-btn>
      <v-btn
        href="https://github.com/skodapetr/knoma/issues"
        rel="noopener noreferrer"
        target="_blank"
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
  "name": "ApplicationLayout",
};
</script>
