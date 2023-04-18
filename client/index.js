import {createApp} from "vue";
import {createRouter, createWebHashHistory} from "vue-router";
import Notifications from "@kyvg/vue3-notification";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import routes from "./application/routes";
import Application from "./application/layout.vue";

const router = createRouter({
  "history": createWebHashHistory(),
  "routes": routes,
});

const vuetify = createVuetify({
  "components": components,
  "directives": directives,
  "theme": {
    "defaultTheme": "dark",
    "themes": {
      "dark": {
        "colors": {
          "primary": "#3739FF",
        },
      },
    },
  },
});

const app = createApp(Application);
app.use(vuetify);
app.use(router);
app.use(Notifications);
app.mount("#application");
