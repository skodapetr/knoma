import About from "../about/about";
import DocumentDetail from "../document-detail/document-detail";
import DocumentList from "../document-list/document-list";

const routes = [
  {
    "path": "/",
    "name": "home",
    "component": About,
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
];

export default routes;
