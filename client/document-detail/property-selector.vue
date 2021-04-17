<template>
  <v-combobox
    v-model="value"
    :loading="loading"
    :disabled="loading"
    :items="filteredItems"
    :auto-select-first="true"
    class="pr-2"
    item-value="iri"
    item-text="label"
    label="Add new predicate"
    autofocus
  />
</template>

<script>
import Vue from "vue";

import {getDatabase} from "../database";

export default {
  "name": "PropertySelector",
  "props": {
    "types": {"type": Array, "required": true},
  },
  "data": () => ({
    "value": "",
    "loading": false,
    "items": [],
    "filteredItems": [],
    "search": null,
  }),
  "watch": {
    "value": function (value) {
      if (value === "") {
        return;
      }
      // Reset to nothing selected.
      Vue.nextTick(() => {
        this.value = "";
      });
      this.$emit("add", value);
    },
    "types": function (value) {
      this.filterItems(value);
    },
  },
  "mounted": async function () {
    this.loading = true;
    this.items = await getDatabase().getPredicates();
    this.filterItems(this.types);
    this.loading = false;
  },
  "methods": {
    "filterItems": function (types) {
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
