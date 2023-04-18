<template>
  <div>
    <div>
      <v-btn
        icon="mdi-share-variant"
        size="small"
        variant="text"
        class="ml-2 mr-4"
        @click="onCopyIri"
      />
      <v-btn
        icon="mdi-pencil"
        size="small"
        variant="text"
        class="mr-4"
        @click="onEditProperties(modelValue)"
      />
      <app-types
        :value="modelValue"
        @input="onEditType"
      />
    </div>
    <v-text-field
      :model-value="modelValue.title"
      label="Title *"
      required
      @update:model-value="onChangeTitle"
    />
    <v-textarea
      :model-value="modelValue.description"
      auto-grow
      clearable
      clear-icon="mdi-close-circle"
      rows="1"
      label="Description"
      @update:model-value="onChangeDescription"
    />
    <div class="outer">
      Properties:
      <app-properties-preview :value="modelValue" />
    </div>
    <v-layout>
      <v-btn
        class="mr-4"
        @click="onSave"
      >
        Save
      </v-btn>
      <v-btn @click="onClose">
        Close
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
import TypeLine from "./type-line";
import PropertiesPreview from "../components/properties-preview";

export default {
  "name": "DocumentDetailHeader",
  "components": {
    "app-types": TypeLine,
    "app-properties-preview": PropertiesPreview,
  },
  "props": {
    "modelValue": {"type": Object, "required": true},
  },
  "emits": [
    "update:model-value",
    /**
     * Change document type.
     */
    "edit-type",
    /**
     * Change document properties.
     */
    "edit-properties",
    /**
     * Save document.
    */
    "save",
    /**
     * Close document.
     */
    "close",
  ],
  "methods": {
    "onCopyIri": function () {
      navigator.clipboard.writeText(this.modelValue.iri);
    },
    "onChangeTitle": function (value) {
      this.$emit("update:model-value", {
        ...this.modelValue,
        "title": value,
      });
    },
    "onChangeDescription": function (value) {
      this.$emit("update:model-value", {
        ...this.modelValue,
        "description": value,
      });
    },
    "onEditType": function(owner) {
      this.$emit("edit-type", owner);
    },
    "onEditProperties": function() {
      this.$emit("edit-properties", this.modelValue);
    },
    "onSave": function () {
      this.$emit("save");
    },
    "onClose": function () {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.outer {
  border-bottom: 1px solid gray;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  padding-top: 0;
}
</style>
