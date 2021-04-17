import VueRouter from "vue-router";
import Home from "../home/home.vue";
import About from "../about/about";
import DocumentDetail from "../document-detail/document-detail";
import DocumentList from "../document-list/document-list";

const router = new VueRouter({
  "routes": [
    {
      "path": "/",
      "name": "home",
      "component": Home,
    }, {
      "path": "/document-edit",
      "name": "document-edit",
      "component": DocumentDetail,
    }, {
      "path": "/documents",
      "name": "documents",
      "component": DocumentList,
    }, {
      "path": "/about",
      "name": "about",
      "component": About,
    },
  ],
});

export default router;
