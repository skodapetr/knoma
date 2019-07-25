<template>
  <v-container
    fluid
    grid-list-lg
  >
    <div>
      <v-text-field
        v-model="document.title"
        label="Title *"
        required
      />
      <v-layout
        grid
        wrap
      >
        <v-flex
          xs12
          sm4
        >
          <v-text-field
            v-model="document.created"
            :disabled="true"
            label="Created"
          />
        </v-flex>
        <v-flex
          xs12
          sm4
        >
          <v-text-field
            v-model="document.lastUpdate"
            :disabled="true"
            label="Last update"
          />
        </v-flex>
        <v-flex
          xs12
          sm4
        >
          <v-text-field
            v-model="document.published"
            label="Published"
          />
        </v-flex>
      </v-layout>
      <app-tag-line-edit v-model="document.keywords" />
      <app-url-list
        v-model="document.urls"
        label="URL *"
      />
      <v-text-field
        v-model="document.identification"
        label="Identification (DOI, ...)"
      />
      <v-textarea
        v-model="document.description"
        label="Description *"
        rows="2"
        auto-grow
      />
    </div>
    <br>
    <div
      v-for="node in document.nodes"
      ref="nodes"
      :key="node.id"
    >
      <app-node-detail
        :value="node"
        @add="onAddNode"
        @delete="onDeleteNode"
        @left="onMoveNodeLeft"
        @right="onMoveNodeRight"
      />
    </div>

    <app-node-template @change="onNodeFromTemplate" />

    <br>
    <br>

    <v-snackbar
      v-model="ui.snackbar"
      :multi-line="true"
      :timeout="ui.snackbarTimeout"
      :color="ui.snackbarColor"
      :top="true"
    >
      {{ ui.snackbarMessage }}
    </v-snackbar>

    <div class="floating-menu">
      <v-btn
        color="blue darken-2"
        dark
        fab
        @click="onScrollDown"
      >
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
      <v-btn
        color="green darken-2"
        dark
        fab
        @click="onSave"
      >
        <v-icon>save</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
  import Vue from "vue";
  import {
    fetchDocument,
    createDocument,
    saveDocument,
    addLocalData
  } from "./../documents-api";
  import UrlList from "./url-list";
  import NodeDetail from "./node-detail";
  import NodeTemplate from "./node-template";
  import {
    fetchKeywords
  } from "./../../app-service/keywords";
  import TagLineEdit from "./../ui/tag-line-editable";

  let nodeCounter = 0;

  export default {
    "name": "app-document-detail",
    "components": {
      "app-url-list": UrlList,
      "app-node-detail": NodeDetail,
      "app-node-template": NodeTemplate,
      "app-tag-line-edit": TagLineEdit
    },
    "data": () => ({
      "document": {
        "title": "",
        "created": new Date().toISOString().substr(0, 10),
        "lastUpdate": "",
        "published": "",
        "keywords": [],
        "urls": [""],
        "identification": "",
        "description": "",
        "nodes": []
      },
      "ui": {
        "snackbar": false,
        "snackbarMessage": "",
        "snackbarColor": "success",
        "snackbarTimeout": 0
      },
      "changingTemplate": false
    }),
    "created": function created() {
      // These are not watched by Vue.js.
      this.private = {};
    },
    "mounted": function mounted() {
      const id = this.$route.params.document;
      if (isIdNew(id)) {
        return;
      }
      fetchDocument(id).then(response => {
        this.document = response.json;
        setNodeCounter(this.document.nodes);
      });
      fetchKeywords().then(() => {
      }).catch((error) => {
        console.error("Can'f fetch keywords.", error);
        this.ui.snackbar = true;
        this.ui.snackbarMessage = "Can't load keywords.";
        this.ui.snackbarColor = "error";
        this.ui.snackbarTimeout = 2600;
      });
    },
    "methods": {
      "getKeywordColor": function (label) {
        const keyword = this.keywords[label];
        if (keyword === undefined) {
          return "grey darken-3";
        }
        switch (keyword.type) {
          case "predefined":
            return "primary";
          case "user":
          default:
            return "grey darken-3";
        }
      },
      "onAddNode": function (parent) {
        const node = createEmptyNode(++nodeCounter);
        addLocalData(node, parent);
        const nodes = this.document.nodes;
        nodes.splice(nodes.indexOf(parent) + 1, 0, node);
      },
      "onDeleteNode": function (node) {
        const toDelete = collectSubTree(node);
        const nodes = this.document.nodes;
        toDelete.forEach((item) => nodes.splice(nodes.indexOf(item), 1));
      },
      "onScrollDown": function () {
        window.scrollTo(0, document.body.scrollHeight);
      },
      "onSave": function () {
        const id = this.$route.params.document;
        let promise;
        this.document.lastUpdate = new Date().toISOString().substr(0, 10);
        if (isIdNew(id)) {
          promise = createDocument(this.document).then((response) => {
            this.$router.replace({
              "name": "document-detail",
              "params": {
                "document": response.json["id"]
              }
            });
            return response;
          });
        } else {
          promise = saveDocument(id, this.document);
        }
        promise.then((response) => {
          this.ui.snackbar = true;
          this.ui.snackbarMessage = "Document saved";
          this.ui.snackbarColor = "default";
          this.ui.snackbarTimeout = 1400;
        });
      },
      "onNodeToggle": function (node) {
        this.ui.nodes[node.id] = !this.ui.nodes[node.id];
      },
      "onMoveNodeLeft": function (node) {
        if (node["_"]["level"] === 0) {
          return;
        }
        // In every case shift tree to the left.
        const subtree = collectSubTree(node);
        subtree.forEach((node) => node["_"]["level"]--);
        removeFromParent(node);
        // Look for new parent.
        const parent = findNewParent(
          node, this.document.nodes, node["_"]["level"] - 1);
        if (parent) {
          setParent(node, parent);
        }
      },
      "onMoveNodeRight": function (node) {
        const parent = findNewParent(
          node, this.document.nodes, node["_"]["level"]);
        if (!parent) {
          return;
        }
        // Modify children.
        const subtree = collectSubTree(node);
        subtree.forEach((node) => node["_"]["level"]++);
        //
        removeFromParent(node);
        setParent(node, parent);
      },
      "onNodeFromTemplate": function (template) {

        const node = {
          ...createEmptyNode(++nodeCounter),
          ...template
        };

        addLocalData(node);
        const nodes = this.document.nodes;
        nodes.push(node);


        // Set focus to the new element.
        Vue.nextTick().then(() => {
          const size = this.$refs.nodes.length;
          const last = this.$refs.nodes[size - 1];
          last.getElementsByClassName("nodeContent")[0]
            .getElementsByTagName("textarea")[0]
            .focus();
        });
      }
    }
  };

  function createEmptyNode(id) {
    return {
      "id": id,
      "type": "citation",
      "content": "",
      "url": "",
      "keywords": [],
      "level": 0
    }
  }

  function isIdNew(id) {
    return id === "new";
  }

  function setNodeCounter(nodes) {
    let maxId = 0;
    for (let index in nodes) {
      const node = nodes[index];
      maxId = Math.max(maxId, node.id);
    }
    nodeCounter = maxId
  }

  function collectSubTree(node) {
    const result = [];
    let queue = [node];
    while (queue.length > 0) {
      const actual = queue.pop();
      result.push(actual);
      queue = queue.concat(actual["_"]["children"]);
    }
    return result;
  }

  function removeFromParent(node) {
    if (!node["_"]["parent"]) {
      return;
    }
    const nodes = node["_"]["parent"]["_"]["children"];
    delete node["parent"];
    delete node["_"]["parent"];
    nodes.splice(nodes.indexOf(node), 1);
  }

  function findNewParent(node, nodes, requiredParentLevel) {
    const nodeIndex = nodes.indexOf(node);
    for (let index = nodeIndex - 1; index >= 0; --index) {
      if (nodes[index]["_"]["level"] === requiredParentLevel) {
        return nodes[index];
      }
    }
    return undefined;
  }

  function setParent(node, parent) {
    node["parent"] = parent["id"];
    node["_"]["parent"] = parent;
    parent["_"]["children"].push(node);
  }

</script>

<style scoped>
  .floating-menu {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
  }
</style>
