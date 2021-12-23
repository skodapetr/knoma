<template>
  <v-list>
    <v-list-item
      v-for="(item, index) in value"
      :key="item.iri"
    >
      <app-item
        :value="item"
        @input="(v) => onChange(index, v)"
        @add="() => onInsert(index)"
        @delete="() => onDelete(index)"
        @edit-properties="onEditProperties"
        @edit-type="onEditType"
      />
    </v-list-item>
    <v-list-item>
      <v-btn @click="onAppend()">
        <v-icon color="green">
          mdi-plus
        </v-icon>
      </v-btn>
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
    "iri": {"type": String, "required": true},
    "value": {"type": Array, "required": true},
  },
  "methods": {
    "onChange": function (index, value) {
      this.$emit("input", [
        ...this.value.slice(0, index),
        value,
        ...this.value.slice(index + 1),
      ]);
    },
    "onInsert": function (index) {
      this.$emit("input", [
        ...this.value.slice(0, index + 1),
        createNewNote(this.iri, this.value),
        ...this.value.slice(index + 1),
      ]);
    },
    "onDelete": function (index) {
      this.$emit("input", [
        ...this.value.slice(0, index),
        ...this.value.slice(index + 1),
      ]);
    },
    "onAppend": function () {
      this.$emit("input", [
        ...this.value,
        createNewNote(this.iri, this.value),
      ]);
    },
    "onEditProperties": function(owner) {
      this.$emit("edit-properties", owner);
    },
    "onEditType": function (owner) {
      this.$emit("edit-type", owner);
    },
  },
};

</script>
