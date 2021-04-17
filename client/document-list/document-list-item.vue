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

export default {
  "name": "DocumentListItem",
  "components": {
    "app-tags": TagLine,
  },
  "props": {
    "value": {"type": Object, "required": true},
  },
  "methods": {
    "onOpen": function () {
      this.$emit("open", this.value.iri);
    },
    "onDelete": function () {
      this.$emit("delete", this.value.iri);
    },
  },
};
</script>