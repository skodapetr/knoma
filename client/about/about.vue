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
    <v-tabs-items
      v-model="tab"
      style="padding: 2rem;"
    >
      <v-tab-item>
        <app-instance />
      </v-tab-item>
      <v-tab-item>
        <app-keyboard />
      </v-tab-item>
      <v-tab-item>
        <app-types />
      </v-tab-item>
      <v-tab-item>
        <app-predicates />
      </v-tab-item>
      <v-tab-item>
        <app-text />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import AboutInstance from "./about-instance";
import AboutKeyboard from "./about-keyboard";
import AboutPredicates from "./about-predicates";
import AboutText from "./about-text";
import AboutTypes from "./about-types";

export default {
  "name": "About",
  "components": {
    "app-instance": AboutInstance,
    "app-keyboard": AboutKeyboard,
    "app-predicates": AboutPredicates,
    "app-text": AboutText,
    "app-types": AboutTypes,
  },
  "data": () => ({
    "tab": 0,
  }),
};
</script>
