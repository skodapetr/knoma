<template>
  <v-container>
    <v-text-field
      label="Text search"
      :value="value.search"
      @input="onSearchInput"
      @change="onChange"
    />
    <app-type-filter
      :value="value"
      @input="onInput"
      @change="onChange"
    />
    <app-property-filter
      :value="value"
      @input="onInput"
      @change="onChange"
    />
  </v-container>
</template>

<script>
import TypeFilter from "./type-filter";
import PropertyFilter from "./property-filter";

export default {
  "name": "DocumentFilter",
  "components": {
    "app-type-filter": TypeFilter,
    "app-property-filter": PropertyFilter,
  },
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
    "onInput": function(value) {
      this.$emit("input", value);
    },
  },
};
</script>