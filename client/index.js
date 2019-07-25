import Vue from "vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import App from "./app/app.vue";
import router from "./app/router";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  "el": "#app",
  "router": router,
  "vuetify": new Vuetify({}),
  "render": (h) => h(App)
});
