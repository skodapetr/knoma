<template>
  <v-container class="outer">
    Properties:
    <dl
      v-for="predicate of content"
      :key="predicate.iri"
    >
      <dt>{{ predicate.label }}:</dt>
      <dd
        v-for="(item, index) in predicate.items"
        :key="index"
      >
        {{ item }}
      </dd>
    </dl>
  </v-container>
</template>

<script>
import {getDatabase} from "../database";

export default {
  "name": "DocumentPropertiesPreview",
  "props": {
    "value": {"type": Object, "required": true},
  },
  "data": () => ({
    "loading": false,
    "content": [],
  }),
  "watch": {
    "value.properties": async function (nextProperties) {
      await this.updateProperties(nextProperties);
    },
  },
  "mounted": async function () {
    await this.updateProperties(this.value.properties);
  },
  "methods": {
    "updateProperties": async function(properties) {
      const database = getDatabase();
      const result = [];
      for (const [predicateIri, items] of Object.entries(properties)) {
        const predicate = await database.getPredicate(predicateIri);
        const itemsToShow = await predicateToValues(database, predicate, items);
        result.push({
          "iri": predicateIri,
          "label": predicate.label,
          "items": itemsToShow,
        });
      }
      result.sort((left, right) => left.label.localeCompare(right.label));
      this.content = result;
    },
  },
};

async function predicateToValues(database, predicate, values) {
  let result = [];
  switch (predicate.type) {
    case "codelist":
      for (const item of values) {
        result.push(await database.getLabel(item));
      }
      break;
    default:
      result = values;
      break;
  }
  return result;
}

</script>

<style scoped>
.outer {
  border-bottom: 1px solid gray;
  margin-bottom: 1rem;
  padding-top: 0;
}
dl {
  display: flex;
  flex-wrap: wrap;
  margin-left: 1rem;
}
dl dd {
  margin-left: 1rem;
}
dl dd:after {
  content: ",";
}
dl dd:last-child:after {
  content: "";
}
</style>
