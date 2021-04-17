<template>
  <v-container>
    <h2>
      <app-header
        :value="value"
        @edit-type="onEditType"
      />
    </h2>
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
      <v-btn
        icon
        @click="onEditProperties(value)"
      >
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
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
import Header from "./type-header";

export default {
  "name": "DocumentDetailHeader",
  "components": {
    "app-header": Header,
  },
  "props": {
    "value": {"type": Object, "required": true},
  },
  "methods": {
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
