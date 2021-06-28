<template>
  <v-container>
    <v-text-field
      label="Text search"
      :value="value.search"
      @input="onSearchInput"
      @change="onChange"
    />
  </v-container>
</template>

<script>
export default {
  "name": "DocumentFilter",
  "props": {
    "value": {"type": Object, "required": true},
  },
  "methods": {
    "onSearchInput": function (value) {
      this.$emit("input", {
        ...this.value,
        "search": value,
      });
    },
    "onChange": function () {
      this.$emit("change");
    },
    "onAddProperty": function () {

    },
  },
};
</script>