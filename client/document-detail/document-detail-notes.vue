<template>
  <v-list>
    <v-list-item
      v-for="(item, index) in modelValue"
      :key="item.iri"
    >
      <app-item
        :document-iri="documentIri"
        :value="item"
        @input="(v) => onChange(index, v)"
        @add="() => onInsert(index)"
        @delete="() => onDelete(index)"
        @edit-properties="onEditProperties"
      />
    </v-list-item>
    <v-list-item>
      <v-btn
        icon="mdi-plus"
        color="green"
        variant="text"
        @click="onAppend()"
      />
    </v-list-item>
  </v-list>
</template>

<script>
import NoteItemEdit from "./note-edit";
import {createNewNote} from "./document-detail-service";

export default {
  "name": "DocumentDetailNotes",
  "components": {
    "app-item": NoteItemEdit,
  },
  "props": {
    "documentIri": {"type": String, "required": true},
    "modelValue": {"type": Array, "required": true},
  },
  "emits": [
    "update:model-value",
    /**
     * Change note properties.
     */
    "edit-properties",
  ],
  "methods": {
    "onChange": function (index, value) {
      this.$emit("update:model-value", [
        ...this.modelValue.slice(0, index),
        value,
        ...this.modelValue.slice(index + 1),
      ]);
    },
    "onInsert": function (index) {
      this.$emit("update:model-value", [
        ...this.modelValue.slice(0, index + 1),
        createNewNote(this.iri, this.modelValue),
        ...this.modelValue.slice(index + 1),
      ]);
    },
    "onDelete": function (index) {
      this.$emit("update:model-value", [
        ...this.modelValue.slice(0, index),
        ...this.modelValue.slice(index + 1),
      ]);
    },
    "onAppend": function () {
      this.$emit("update:model-value", [
        ...this.modelValue,
        createNewNote(this.iri, this.modelValue),
      ]);
    },
    "onEditProperties": function(owner) {
      this.$emit("edit-properties", owner);
    },
  },
};

</script>
