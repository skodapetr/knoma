<template>
  <v-card
    class="ma-2"
    width="100%"
  >
    <v-card-title class="pb-0">
      <app-header
        :value="value"
        @edit-type="onEditType"
      />
    </v-card-title>
    <v-card-text class="pb-0">
      <v-textarea
        :value="value.text"
        auto-grow
        clearable
        clear-icon="mdi-close-circle"
        rows="1"
        label="Content"
        @input="onChangeContent"
        @paste="onPaste"
      />
      <img
        v-show="value.image"
        :src="value.image"
        style="border-style: ridge;"
      >
    </v-card-text>
    <v-card-actions>
      <v-btn
        icon
        @click="onEditProperties(value)"
      >
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn
        v-show="value.image"
        @click="onClearImage"
      >
        Clear Image
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
    </v-card-actions>
  </v-card>
</template>

<script>
import Header from "./type-header";

export default {
  "name": "NoteEdit",
  "components": {
    "app-header": Header,
  },
  "props": {
    "value": {"type": Object, "required": true},
  },
  "methods": {
    "onCopyIri": function () {
      navigator.clipboard.writeText(this.value.iri);
    },
    "onChangeContent": function (value) {
      this.$emit("input", {
        ...this.value,
        "content": value,
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
    "onEditProperties": function() {
      this.$emit("edit-properties", this.value);
    },
    "onEditType": function () {
      this.$emit("edit-type", this.value);
    },
  },
};
</script>
