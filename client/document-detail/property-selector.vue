<template>
  <v-combobox
    v-model="value"
    :loading="loading"
    :disabled="loading"
    :items="items"
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
  "data": () => ({
    "value": "",
    "loading": false,
    "items": [],
    "search": null,
  }),
  "watch": {
    "value": function (value) {
      if (value === "") {
        return;
      }
      // Reset to nothing selected.
      Vue.nextTick( () => {
        this.value = "";
      });
      this.$emit("add", value);
    },
  },
  "mounted": async function () {
    this.loading = true;
    this.items = await getDatabase().getPredicates();
    this.loading = false;
  },
};

</script>
