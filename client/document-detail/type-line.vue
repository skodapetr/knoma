<template>
  <span>
    <app-tags
      :value="value.types"
      small
      @click="onEditType"
    />
    <v-btn
      v-show="value.types.length === 0"
      icon
      @click="onEditType"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
  </span>
</template>

<script>
import TagLine from "../components/tag-line";

export default {
  "name": "TypeLine",
  "components": {
    "app-tags": TagLine,
  },
  "props": {
    "value": {"type": Object, "required": true},
  },
  "methods": {
    "onEditType": function () {
      this.$emit("edit-type", this.value);
    },
  },
};
</script>