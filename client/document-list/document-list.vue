<template>
  <v-container>
    <v-list>
      <app-item
        v-for="item in documents"
        :key="item.iri"
        :value="item"
        @open="onOpen"
        @delete="onDelete"
      />
    </v-list>
    <div class="floating-menu">
      <v-btn
        class="bottom"
        color="green darken-2"
        fab
        dark
        @click="onCreate"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-overlay :value="loading">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      />
    </v-overlay>
  </v-container>
</template>

<script>
import {getDatabase} from "../database";
import Item from "./document-list-item";

export default {
  "name": "DocumentList",
  "components": {
    "app-item": Item,
  },
  "data": () => ({
    "documents": [],
    "loading": false,
  }),
  "mounted": async function mounted() {
    this.loading = true;
    this.documents = await getDatabase().getDocuments();
    this.loading = false;
  },
  "methods": {
    "onOpen": function (iri) {
      this.$router.push({
        "name": "document-edit",
        "query": {
          "document": iri,
        },
      });
    },
    "onDelete": async function (iri) {
      this.loading = true;
      const database = getDatabase();
      await database.deleteDocument(iri);
      this.documents = await database.getDocuments();
      this.loading = false;
    },
    "onCreate": function () {
      this.$router.push({
        "name": "document-edit",
      });
    },
  },
};
</script>

<style scoped>
.bottom {
  bottom: 2rem;
}

.floating-menu {
  position: fixed;
  right: 1rem;
  bottom: -0.9rem;
}
</style>
