<template>
  <v-card
    class="ma-2"
    width="100%"
  >
    <v-card-title class="pb-0">
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
      <v-spacer />
      <v-btn
        icon
        class="mr-4"
        @click="onDelete"
      >
        <v-icon color="red">
          mdi-minus
        </v-icon>
      </v-btn>
      <v-btn
        icon
        @click="onAdd()"
      >
        <v-icon color="green">
          mdi-plus
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="pb-0">
      <v-textarea
        :value="value.text"
        class="note-content-input"
        auto-grow
        clearable
        clear-icon="mdi-close-circle"
        rows="1"
        label="Content"
        @input="onChangeContent"
        @paste="onPaste"
        @keydown="onKeyDown"
      />
      <img
        v-show="value.image && showImage"
        :src="value.image"
        style="border-style: ridge;background-color: wheat;width: 100%;"
      >
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-show="value.image"
        @click="onToggleImage"
      >
        Toggle Image
      </v-btn>
      <v-btn
        v-show="value.image && showImage"
        @click="onClearImage"
      >
        Clear Image
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from "vue";
import {onKeyAltDown} from "./note-edit-service";

export default {
  "name": "NoteEdit",
  "props": {
    "value": {"type": Object, "required": true},
    "documentIri": {"type": String, "required": true},
  },
  "data": () => ({
    "showImage": false,
  }),
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
      if (event.altKey) {
        let result = onKeyAltDown(this.value.text, event);
        if (result === null) {
          return;
        }
        this.$emit("input", {
          ...this.value,
          "text": result.value,
        });
        Vue.nextTick(() => {
          event.target.selectionStart = result.positionStart;
          event.target.selectionEnd = result.positionEnd;
        });
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
  },
};
</script>
