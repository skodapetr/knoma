<template>
  <v-card
    class="mx-2"
    width="100%"
  >
    <v-card-title class="py-0 flex">
      <v-btn
        icon="mdi-share-variant"
        size="small"
        class="ml-2 mr-4"
        @click="onCopyIri"
      />
      <v-btn
        icon="mdi-pencil"
        size="small"
        class="mr-4"
        @click="onEditProperties(value)"
      />
      <v-switch
        :model-value="isQuote"
        color="indigo"
        label="Quote"
        density="compact"
        @update:model-value="onToggleQuote"
      />
      <v-spacer />
      <v-btn
        icon="mdi-minus"
        size="small"
        variant="text"
        color="red"
        class="mr-4"
        @click="onDelete"
      />
      <v-btn
        icon="mdi-plus"
        size="small"
        variant="text"
        color="green"
        @click="onAdd()"
      />
    </v-card-title>
    <v-card-text>
      <v-textarea
        :model-value="value.text"
        class="note-content-input"
        auto-grow
        clearable
        clear-icon="mdi-close-circle"
        rows="1"
        label="Content"
        :hide-details="true"
        @update:model-value="onChangeContent"
        @paste="onPaste"
        @keydown="onKeyDown"
      />
      <img
        v-show="value.image && showImage"
        :src="value.image"
        style="border-style: ridge;background-color: wheat;width: 100%;"
      >
    </v-card-text>
    <v-card-actions v-show="value.image">
      <v-btn
        @click="onToggleImage"
      >
        Toggle Image
      </v-btn>
      <v-btn
        v-show="showImage"
        @click="onClearImage"
      >
        Clear Image
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {onToggleQuote} from "./note-edit-service";
import {QUOTE} from "../database/predefined";

export default {
  "name": "NoteEdit",
  "props": {
    "value": {"type": Object, "required": true},
    "documentIri": {"type": String, "required": true},
  },
  "emits": [
    "input",
    /**
     * Delete note.
     */
    "delete",
    /**
     * Insert new note after this one.
     */
    "add",
    /**
     * Change note properties.
     */
    "edit-properties",
  ],
  "data": () => ({
    "showImage": false,
  }),
  "computed": {
    "isQuote": function() {
      return (this.value.types ?? []).includes(QUOTE);
    },
  },
  "methods": {
    "onCopyIri": function () {
      const iri = this.documentIri + "/notes/" + this.value.identifier;
      navigator.clipboard.writeText(iri);
    },
    "onChangeContent": function (value) {
      this.$emit("input", {
        ...this.value,
        "text": value,
      });
    },
    "onClearImage": function () {
      this.$emit("input", {
        ...this.value,
        "image": undefined,
      });
    },
    "onDelete": function () {
      this.$emit("delete");
    },
    "onAdd": function () {
      this.$emit("add");
    },
    "onKeyDown": function (event) {
      if (event.altKey && event.key === "q") {
        this.onToggleQuote();
        event.preventDefault();
      }
    },
    "onPaste": function (event) {
      for (const item of event.clipboardData.items) {
        if (!item.type.includes("image")) {
          continue;
        }
        event.preventDefault();
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = () => {
          const imageInBase64 = reader.result;
          this.$emit("input", {
            ...this.value,
            "image": imageInBase64,
          });
        };
        reader.readAsDataURL(file);
        break;
      }
    },
    "onEditProperties": function () {
      this.$emit("edit-properties", this.value);
    },
    "onToggleImage": function () {
      this.showImage = !this.showImage;
    },
    "onToggleQuote": function () {
      this.$emit("input", onToggleQuote(this.value));
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}
</style>
