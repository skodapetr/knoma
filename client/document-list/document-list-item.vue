<template>
  <v-list-item @click="onOpen">
    <v-list-item-title>
      {{ value.title || value.iri }}
    </v-list-item-title>
    <v-list-item-subtitle>
      <app-tags
        :value="value.types"
        small
      />
      <v-chip
        v-for="(tag, index) in tags"
        :key="index"
        :small="true"
        :color="tag.color"
        class="mr-2"
      >
        {{ tag.label }}
      </v-chip>
    </v-list-item-subtitle>
    <v-list-item-action>
      <v-btn
        icon
        color="red"
        @click.stop="onDelete"
      >
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-list-item-action>
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
