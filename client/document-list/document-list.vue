<template>
  <v-container>
    <app-filter
      v-model="source.filters"
      @change="reload"
    />
    <v-list class="item-list">
      <app-item
        v-for="item in source.visibleDocuments"
        :key="item.iri"
        :value="item"
        @open="onOpen"
        @delete="onDelete"
      />
      <v-divider />
      <v-list-item>
        <template v-if="source.visibleLimit < source.documents.length">
          <div>
            Showing {{ source.visibleLimit }}
            out of {{ source.documents.length }}
            documents.
          </div>
          <v-btn
            class="mt-2"
            @click="onShowMore"
          >
            Show more
          </v-btn>
        </template>
        <template v-else>
          All of {{ source.documents.length }} documents are visible.
        </template>
      </v-list-item>
    </v-list>
    <div class="floating-menu">
      <v-btn
        color="green darken-2"
        icon="mdi-plus"
        @click="onCreate"
      />
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
import Filter from "./document-filter";
import {FilteredDocumentSource} from "./filtered-document-source";

export default {
  "name": "DocumentListView",
  "components": {
    "app-item": Item,
    "app-filter": Filter,
  },
  "data": () => ({
    "source": new FilteredDocumentSource(),
    "loading": false,
  }),
  "mounted": async function mounted() {
    await this.reload();
  },
  "methods": {
    "onOpen": function (event) {
      const location = {
        "name": "document-edit",
        "query": {
          "document": event.iri,
        },
      };
      if (event.ctrlKey) {
        const url = this.$router.resolve(location).href;
        window.open(url, "_blank");
      } else {
        this.$router.push(location);
      }
    },
    "onDelete": async function (iri) {
      this.loading = true;
      const database = getDatabase();
      await database.deleteDocument(iri);
      this.loading = false;
      //
      await this.reload();
    },
    "onCreate": function () {
      this.$router.push({
        "name": "document-edit",
      });
    },
    "reload": async function() {
      this.loading = true;
      await this.source.refresh();
      this.loading = false;
    },
    "onShowMore": function() {
      this.source.showMore();
    },
  },
};
</script>

<style scoped>

.floating-menu {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}

.item-list {
  margin-bottom: 5rem;
}
</style>
