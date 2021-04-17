<template>
  <v-list-item @click="onOpen">
    <v-list-item-title>
      {{ value.title || value.iri }}
    </v-list-item-title>
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
export default {
  "name": "DocumentListItem",
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