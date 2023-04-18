<template>
  <v-container>
    <v-tabs
      v-model="tab"
      grow
    >
      <v-tab>Instance</v-tab>
      <v-tab>Keyboard</v-tab>
      <v-tab>Types</v-tab>
      <v-tab>Predicates</v-tab>
      <v-tab>Text</v-tab>
    </v-tabs>
    <v-window
      v-model="tab"
      style="padding: 2rem;"
    >
      <v-window-item>
        <app-instance />
      </v-window-item>
      <v-window-item>
        <app-keyboard />
      </v-window-item>
      <v-window-item>
        <app-types />
      </v-window-item>
      <v-window-item>
        <app-predicates />
      </v-window-item>
      <v-window-item>
        <app-text />
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import AboutInstance from "./about-instance";
import AboutKeyboard from "./about-keyboard";
import AboutPredicates from "./about-predicates";
import AboutText from "./about-text";
import AboutTypes from "./about-types";

/**
 * About page, holds information about application configuration
 * and documentation.
 */
export default {
  "name": "AboutView",
  "components": {
    "app-instance": AboutInstance,
    "app-keyboard": AboutKeyboard,
    "app-predicates": AboutPredicates,
    "app-text": AboutText,
    "app-types": AboutTypes,
  },
  "data": () => ({
    /**
     * Index of selected tab.
     */
    "tab": 0,
  }),
};
</script>
