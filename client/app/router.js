import VueRouter from "vue-router";
import DocumentList from "@/document/list/document-list.vue";
import DocumentDetail from "@/document/detail/document-detail.vue";

const router = new VueRouter({
  "routes": [
    {
      "path": "/",
      "name": "home",
      "component": DocumentList
    }, {
      "path": "/documents",
      // Can be used to identity the path from link.
      "name": "document-list",
      "component": DocumentList
    }, {
      "path": "/documents/:document",
      "name": "document-detail",
      "component": DocumentDetail
    }
  ]
});

export default router;