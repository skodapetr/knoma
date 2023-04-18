<template>
  <div class="pb-2">
    <v-text-field
      label="Text search"
      :value="modelValue.search"
      @update:model-value="onSearchInput"
      @change="onChange"
    />
    <app-type-filter
      :value="modelValue"
      @input="onInput"
      @change="onChange"
    />
    <app-property-filter
      :value="modelValue"
      @input="onInput"
      @change="onChange"
    />
  </div>
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
    "modelValue": {"type": Object, "required": true},
  },
  "emits": [
    "update:model-value",
    /**
     * Input value has changed.
     */
    "change",
  ],
  "methods": {
    "onSearchInput": function (value) {
      this.$emit("update:model-value", {
        ...this.modelValue,
        "search": value,
      });
      this.$emit("change");
    },
    "onChange": function () {
      this.$emit("change");
    },
    "onInput": function(value) {
      this.$emit("update:model-value", value);
    },
  },
};
</script>