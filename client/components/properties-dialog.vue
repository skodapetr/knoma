<template>
  <v-dialog
    :model-value="visible"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @keydown.esc="onClose"
  >
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon="mdi-check"
          @click="onSave"
        />
        <v-toolbar-title>Edit Properties</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            icon="mdi-close"
            @click="onClose"
          />
        </v-toolbar-items>
      </v-toolbar>
      <v-list>
        <v-list-item
          v-for="entry in Object.entries(modelValue)"
          :key="entry[0]"
        >
          <v-list-item-title>
            <app-property-edit
              :predicate="entry[0]"
              :model-value="entry[1]"
              @update:model-value="(v) => onChange(entry[0], v)"
              @delete="onDelete(entry[0])"
            />
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <app-property-selector
            label="Add new predicate"
            :types="types"
            @add="onAdd"
          />
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import PropertyEdit from "./properties-dialog-item";
import PropertySelector from "../components/property-selector";

export default {
  "name": "PropertiesDialog",
  "components": {
    "app-property-edit": PropertyEdit,
    "app-property-selector": PropertySelector,
  },
  "props": {
    "modelValue": {"type": Object, "required": true},
    "visible": {"type": Boolean, "required": true},
    "types": {"type": Array, "required": true},
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
  "methods": {
    "onChange": function (key, value) {
      this.$emit("update:model-value", {
        ...this.modelValue,
        [key]: value,
      });
    },
    "onDelete": function (key) {
      const newValue = {...this.modelValue};
      delete newValue[key];
      this.$emit("update:model-value", newValue);
    },
    "onAdd": function (predicate) {
      if (this.modelValue[predicate.iri] !== undefined) {
        return;
      }
      this.$emit("update:model-value", {
        ...this.modelValue,
        [predicate.iri]: [""],
      });
    },
    "onSave": function() {
      this.$emit("save");
    },
    "onClose": function() {
      this.$emit("close");
    },
  },
};
</script>
