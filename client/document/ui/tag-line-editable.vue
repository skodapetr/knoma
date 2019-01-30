<template>
  <v-combobox
    :value="value"
    :items="keywords"
    label="Keywords *"
    append-icon=""
    chips
    multiple
    @input="onChange">
    <template
      slot="selection"
      slot-scope="{item}">
      <app-chip
        :key="item"
        :value="item"/>
    </template>
  </v-combobox>
</template>

<script>
  import Chip from "./tag-chip";
  import {getKeywordsLabels} from "@/app-service/keywords";

  export default {
    "name": "app-tag-line",
    "components": {
      "app-chip": Chip
    },
    "props": {
      "value": {"type": Array, "required": true},
      "keyFnc": {"type": Function, "default": (value) => value},
      "labelFnc": {"type": Function, "default": (value) => value}
    },
    "data": () => ({
      "keywords": []
    }),
    "mounted": function mounted() {
      this.keywords = getKeywordsLabels();
    },
    "methods": {
      "onChange": function (newValue) {
        this.$emit("input", newValue);
      }
    }
  };
</script>
