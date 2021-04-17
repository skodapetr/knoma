import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import "vuetify/dist/vuetify.min.css";

import router from "./application/router";
import Layout from "./application/layout.vue";

Vue.use(Vuetify);
Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  "el": "#application",
  "router": router,
  "vuetify": new Vuetify({
    "theme": {
      "dark": true
    },
  }),
  "render": (createElement) => createElement(Layout),
});
