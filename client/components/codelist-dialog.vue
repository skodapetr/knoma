<template>
  <v-dialog
    :model-value="visible"
    persistent
    @keydown.esc="onClose"
  >
    <v-card>
      <v-card-title class="headline">
        Type
      </v-card-title>
      <v-card-text class="mt-4">
        <v-select
          :model-value="modelValue"
          :items="items"
          item-title="title"
          item-value="iri"
          label="Type"
          :multiple="multiple"
          chips
          @update:model-value="onChange"
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
    "modelValue": {"type": Array, "required": true},
    /**
     * Name of a codelist to select values from.
     */
    "codelist": {"type": Array, "required": true},
    "visible": {"type": Boolean, "required": true},
    "multiple": {"type": Boolean, "default": true},
    "refreshOnShow": {"type": Boolean, "default": false},
  },
  "emits": [
    "update:model-value",
    /**
     * Close dialog.
     */
    "close",
    /**
     * Save and close the dialog.
     */
    "save",
  ],
  "data": () => ({
    "items": [],
    "loading": false,
  }),
  "watch": {
    "visible": async function (newVisibility) {
      if (!newVisibility) {
        // Hiding the dialog.
        return;
      }
      console.log("onShow", this.modelValue);
      if (this.refreshOnShow) {
        await this.reloadCodelistFromDatabase();
      }
    },
  },
  "mounted": async function() {
    await this.reloadCodelistFromDatabase();
  },
  "methods": {
    "reloadCodelistFromDatabase": async function() {
      const database = getDatabase();
      this.loading = true;
      const iris = await database.getCodelist(this.codelist);
      const tags = [];
      for (const iri of iris) {
        tags.push({
          "iri": iri,
          "title": await database.getLabel(iri),
        });
      }
      this.items = tags;
      this.loading = false;
    },
    "onChange": function (value) {
      if (!this.multiple) {
        // When used without multiple, value is string instead of an array.
        value = [value];
      }
      console.log("onChange", value);
      this.$emit("update:model-value", value);
    },
    "onClose": function () {
      console.log("onClose", this.modelValue);
      this.$emit("close");
    },
    "onSave": function () {
      console.log("onSave", this.modelValue);
      this.$emit("save", this.modelValue);
    },
  },
};
</script>
