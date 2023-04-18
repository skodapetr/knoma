<template>
  <span>
    <app-tags
      :value="value.types"
      @click="onEditType"
    />
    <v-btn
      v-show="value.types.length === 0"
      size="small"
      variant="text"
      icon="mdi-plus"
      @click="onEditType"
    />
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
  "emits": [
    "input",
  ],
  "methods": {
    "onEditType": function () {
      this.$emit("input", this.value);
    },
  },
};
</script>