<template>
  <v-dialog
    :value="visible"
    persistent
    @keydown.esc="onClose"
  >
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Note Type
      </v-card-title>
      <v-card-text class="mt-4">
        <v-select
          :value="value"
          :items="items"
          item-text="title"
          item-value="iri"
          label="Type"
          multiple
          chips
          return-object
          @input="onChange"
        />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="onSave"
        >
          Save
        </v-btn>
        <v-btn
          text
          @click="onClose"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {getDatabase} from "../database";

export default {
  "name": "CodelistDialog",
  "props": {
    "value": {"type": Array, "required": true},
    "codelist": {"type": Array, "required": true},
    "visible": {"type": Boolean, "required": true},
  },
  "data": () => ({
    "items": [],
    "loading": false,
  }),
  "watch": {
    "visible": async function () {
      this.loading = true;
      this.items = await getDatabase().getCodelist(this.codelist);
      this.loading = false;
    },
  },
  "methods": {
    "onChange": function (value) {
      this.$emit("input", value);
    },
    "onClose": function () {
      this.$emit("close");
    },
    "onSave": function () {
      this.$emit("save", this.value);
    },
  },
};
</script>

