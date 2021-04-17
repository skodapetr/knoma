<template>
  <span>
    <v-chip
      v-for="tag in tags"
      :key="tag.iri"
      :small="small"
      class="mr-2"
      @click="onClick"
    >
      {{ tag.label }}
    </v-chip>
  </span>
</template>

<script>
import {getDatabase} from "../database";

export default {
  "name": "TagLine",
  "props": {
    "value": {"type": Array, "required": true},
    "small": {"type": Boolean, "default": false},
  },
  "data": () => ({
    "tags": [],
  }),
  "watch": {
    "value": function () {
      this.computeTags();
    },
  },
  "mounted": function () {
    this.computeTags();
  },
  "methods": {
    "computeTags": async function () {
      const result = [];
      const database = getDatabase();
      for (const iri of this.value) {
        result.push({
          "iri": iri,
          "label": await database.getLabel(iri),
        });
      }
      this.tags = result;
    },
    "onClick": function () {
      this.$emit("click");
    },
  },
};
</script>