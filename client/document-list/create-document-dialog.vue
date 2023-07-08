<template>
  <v-dialog
    :model-value="visible"
    persistent
    @keydown.esc="onClose"
  >
    <v-card>
      <v-card-title class="headline">
        Select template
      </v-card-title>
      <v-card-text class="mt-4">
        <v-select
          v-model="selected"
          label="Select template"
          :items="items"
          item-title="title"
          item-value="iri"
          @update:model-value="onUpdateSelect"
        />
        <v-text-field
          v-for="item in values"
          :key="item.name"
          v-model="item.value"
          :label="item.name"
        />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          color="primary"
          :disabled="activeItem === null"
          @click="onCreate"
        >
          Create
        </v-btn>
        <v-btn
          @click="onClose"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {createDocument, getDatabase} from "../database";
import {applyTemplateValues, selectTemplateValues} from "../database/template";
import {TEMPLATE_EMPTY} from "../database/predefined";

export default {
  "name": "CreateDocumentDialog",
  "props": {
    "visible": {"type": Boolean, "required": true},
  },
  "emits": [
    "close",
    /**
     * Identification of newly created document.
     */
    "create",
  ],
  "data": () => ({
    "loading": false,
    "items": [],
    "activeItem": null,
    "values": [],
    "selected": "",
  }),
  "watch": {
    "visible": async function (newVisibility) {
      if (!newVisibility) {
        // Hiding the dialog.
        return;
      }
      await this.reloadFromDatabase();
    },
  },
  "methods": {
    "reloadFromDatabase": async function() {
      const database = getDatabase();
      this.loading = true;
      this.items = await database.getTemplateDocuments();
      this.loading = false;
      // Select initial value. This is not really connected,
      // but it works.
      this.selected = "Empty document";
      this.onUpdateSelect(TEMPLATE_EMPTY);
    },
    "onUpdateSelect": function(iri) {
      this.activeItem = null;
      for (const item of this.items) {
        if (item.iri === iri) {
          this.activeItem = item;
          break;
        }
      }
      const placeholders = selectTemplateValues(this.activeItem);
      this.values = placeholders.map(name => ({
        "name": name,
        "value": "",
      }));
    },
    "onClose": function () {
      this.$emit("close");
    },
    "onCreate": async function () {
      const template = applyTemplateValues(this.activeItem, this.values);
      const document = createDocument(template);
      const database = getDatabase();
      await database.storeDocument(document);
      this.$emit("create", document);
    },
  },
};
</script>