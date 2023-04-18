<template>
  <v-combobox
    ref="input"
    v-model="value"
    :loading="loading"
    :disabled="loading"
    :items="filteredItems"
    :label="label"
    class="px-4"
    item-value="iri"
    item-title="label"
    return-object
    autofocus
  />
</template>

<script>
import {nextTick} from "vue";

import {getDatabase} from "../database";

export default {
  "name": "PropertySelector",
  "props": {
    "label": {"type": String, "required": true},
    "types": {"type": Array, "required": false, "default": undefined},
  },
  "emits": [
    /**
     * Add new property.
     */
    "add",
  ],
  "data": () => ({
    "value": "",
    "loading": false,
    "items": [],
    "filteredItems": [],
    "search": null,
  }),
  "watch": {
    "value": function (newValue) {
      if (typeof(newValue) !== "object") {
        return;
      }
      this.$emit("add", newValue);
      // Reset to nothing selected.
      nextTick(() => {
        this.value = "";
        this.$refs.input.blur();
      });
    },
    "types": function (value) {
      this.updateFilteredItems(value);
    },
  },
  "mounted": async function () {
    this.loading = true;
    this.items = await getDatabase().getPredicates();
    this.updateFilteredItems(this.types);
    this.loading = false;
  },
  "methods": {
    "updateFilteredItems": function (types) {
      this.filteredItems = this.items
        .filter(item => shouldBeUsed(item.domain, types));
    },
  },
};

function shouldBeUsed(domain, currentTypes) {
  if (domain === undefined || domain.length === 0) {
    return true;
  }
  if (currentTypes === undefined) {
    return false;
  }
  for (const typeObject of currentTypes) {
    if (domain.includes(typeObject)) {
      return true;
    }
  }
  return false;
}

</script>
