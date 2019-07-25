<template>
  <v-chip
    :color="getColor()"
    :text-color="outline ? 'black' : 'white'"
    :outlined="outline"
    :small="small"
    class="chip"
  >
    {{ value }}
  </v-chip>
</template>

<script>
  // v-chip--select-multi

  import {getKeywordsMap} from "./../../app-service/keywords";

  const COLOR_MAP = {
    "published": "grey darken-3",
    "user": "grey darken-3",
    "predefined": "light-blue darken-3",
    "default": "red"
  };

  export default {
    "name": "app-tag-chip",
    "props": {
      "value": {"type": String, "required": true},
      "outline": {"type": Boolean, "default": false},
      "small": {"type": Boolean, "default": false},
      "type": {"type": String, "required": false},
    },
    "methods": {
      "getColor": function () {
        const keyword = getKeywordsMap()[this.value];
        let type;
        if (this.type) {
          type = this.type;
        } else {
          if (keyword === undefined) {
            type = "user";
          } else {
            type = keyword.type;
          }
        }
        return COLOR_MAP[type] || COLOR_MAP["default"];
      }
    }
  };
</script>

<style scoped>
  .chip {
    margin-left: 0.2rem;
  }
</style>