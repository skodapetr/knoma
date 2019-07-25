<template>
  <v-container>
    <v-list two-line>
      <template v-for="item in documents">
        <v-list-item
          :key="item.id"
          @click="onNavigate(item)"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <app-chip
                v-if="item.published"
                :value="item.published"
                type="published"
                outlined
                small
              />
              <app-tag-line :value="item.keywords" />
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-btn
            text
            icon
            color="red"
            @click.stop="onDelete(item)"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </v-list-item>
      </template>
    </v-list>
    <div class="floating-menu">
      <v-btn
        class="bottom"
        color="green darken-2"
        fab
        dark
        @click="onCreate"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
  import {fetchList, deleteDocument} from "./../documents-api";
  import {fetchKeywords} from "./../../app-service/keywords";
  import TagLine from "./../ui/tag-line";
  import TagChip from "./../ui/tag-chip";

  export default {
    "name": "app-document-list",
    "components": {
      "app-tag-line": TagLine,
      "app-chip": TagChip
    },
    "data": () => ({
      "documents": []
    }),
    "mounted": function mounted() {
      fetchKeywords().then(() => {
        fetchList().then(response => {
          this.documents = response.json;
        });
      });
    },
    "methods": {
      "onNavigate": function (item) {
        this.$router.push({
          "name": "document-detail",
          "params": {
            "document": item["id"]
          }
        })
      },
      "onDelete": function (item) {
        deleteDocument(item["id"]).then(() => {
          const index = this.documents.indexOf(item);
          this.documents = [
            ...this.documents.slice(0, index),
            ...this.documents.slice(index + 1)
          ];
        });
      },
      "onCreate": function () {
        this.$router.push({
          "name": "document-detail",
          "params": {
            "document": "new"
          }
        })
      }
    }
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
