<template>
  <v-container>
    <div>
      <v-btn
        icon
        class="ml-2 mr-4"
        @click="onCopyIri"
      >
        <v-icon>
          mdi-share-variant
        </v-icon>
      </v-btn>
      <v-btn
        icon
        class="mr-4"
        @click="onEditProperties(value)"
      >
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <app-types
        :value="value"
        @edit-type="onEditType"
      />
    </div>
    <v-text-field
      :value="value.title"
      label="Title *"
      required
      @input="onChangeTitle"
    />
    <v-textarea
      :value="value.description"
      auto-grow
      clearable
      clear-icon="mdi-close-circle"
      rows="1"
      label="Description"
      @input="onChangeDescription"
    />
    <v-layout>
      <v-flex />
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
  </v-container>
</template>

<script>
import TypeLine from "./type-line";

export default {
  "name": "DocumentDetailHeader",
  "components": {
    "app-types": TypeLine,
  },
  "props": {
    "value": {"type": Object, "required": true},
  },
  "methods": {
    "onCopyIri": function () {
      navigator.clipboard.writeText(this.value.iri);
    },
    "onChangeTitle": function (value) {
      this.$emit("input", {
        ...this.value,
        "title": value,
      });
    },
    "onChangeDescription": function (value) {
      this.$emit("input", {
        ...this.value,
        "description": value,
      });
    },
    "onEditType": function(owner) {
      this.$emit("edit-type", owner);
    },
    "onEditProperties": function() {
      this.$emit("edit-properties", this.value);
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
