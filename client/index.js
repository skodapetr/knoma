import Vue from "vue";
import VueRouter from "vue-router";
import App from "app/app.vue";
import DocumentList from "document/list/document-list.vue";
import DocumentDetail from "document/detail/document-detail.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
    "routes": [
        {
            "path": "/documents",
            // Can be used to identity the path from link.
            "name": "document-list",
            "component": DocumentList
        },
        {
            "path": "/documents/:document",
            "name": "document-detail",
            "component": DocumentDetail
        }
    ]
});

/* eslint-disable no-new */
new Vue({
    "el": "#app",
    "router": router,
    "render": (h) => h(App)
});


