<template>
  <v-list-item @click="onOpen">
    <v-list-item-title>
      {{ value.title || value.iri }}
    </v-list-item-title>

    <v-list-item-subtitle>
      <app-tags
        :value="value.types"
        size="small"
      />
      <v-chip
        v-for="(tag, index) in tags"
        :key="index"
        :color="tag.color"
        size="small"
        variant="outlined"
        class="ma-1"
      >
        {{ tag.label }}
      </v-chip>
    </v-list-item-subtitle>

    <template #append>
      <v-btn
        color="red"
        icon="mdi-delete"
        variant="text"
        @click.stop="onDelete"
      />
    </template>
  </v-list-item>
</template>

<script>
import TagLine from "../components/tag-line";
import {buildDocumentTagList} from "./document-list-service";

export default {
  "name": "DocumentListItem",
  "components": {
    "app-tags": TagLine,
  },
  "props": {
    "value": {"type": Object, "required": true},
  },
  "emits": [
    /**
     * Open this item.
     */
    "open",
    /**
     * Delete item.
     */
    "delete",
  ],
  "data": () => ({
    "tags": [],
  }),
  "mounted": async function () {
    await this.refresh();
  },
  "methods": {
    "onOpen": function (event) {
      this.$emit("open", {
        "iri": this.value.iri,
        "ctrlKey": event.ctrlKey,
      });
    },
    "onDelete": function () {
      this.$emit("delete", this.value.iri);
    },
    "refresh": async function () {
      this.tags = await buildDocumentTagList(this.value);
    },
  },
};
</script>
