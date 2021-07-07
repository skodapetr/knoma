<template>
  <v-list>
    <v-subheader>
      <button @click="onDelete">
        <v-icon color="red">
          mdi-minus
        </v-icon>
      </button>
      {{ definition.label }}
    </v-subheader>
    <v-list-item
      v-for="(content, index) in value"
      :key="index"
    >
      <button
        v-if="definition.multiple"
        @click="onAddValue(index)"
      >
        <v-icon>
          mdi-plus
        </v-icon>
      </button>
      <button
        v-if="definition.multiple"
        @click="onDeleteValue(index)"
      >
        <v-icon>
          mdi-minus
        </v-icon>
      </button>
      <v-text-field
        v-if="definition.type === 'string'"
        :value="content"
        @input="(v) => onUpdateValue(index, v)"
      />
      <app-date-picker
        v-else-if="definition.type === 'date'"
        :value="content"
        @input="(v) => onUpdateValue(index, v)"
      />
      <v-select
        v-else-if="definition.type === 'codelist'"
        :value="content"
        :items="items"
        item-text="title"
        item-value="iri"
        @input="(v) => onUpdateValue(index, v)"
      />
    </v-list-item>
    <v-list-item v-if="value.length === 0">
      <button @click="onAddValue()">
        <v-icon>
          mdi-plus
        </v-icon>
      </button>
    </v-list-item>
  </v-list>
</template>

<script>
import {getDatabase} from "../database";
import DatePicker from "./date-picker";

export default {
  "name": "PropertiesDialogItem",
  "components": {
    "app-date-picker": DatePicker,
  },
  "props": {
    "predicate": {"type": String, "required": true},
    "value": {"type": Array, "required": true},
  },
  "data": () => ({
    "definition": {},
    "loading": false,
    "items": [],
  }),
  "mounted": async function () {
    const database = getDatabase();
    this.loading = true;
    this.definition = (await database.getPredicate(this.predicate)) || {};
    if (this.definition.type === "codelist") {
      const iris = await database.getCodelist(this.definition.codelist);
      const items = [];
      for (const iri of iris) {
        items.push({
          "iri": iri,
          "title": await database.getLabel(iri),
        });
      }
      this.items = items;
    }
    this.loading = false;
  },
  "methods": {
    "onDelete": function () {
      this.$emit("delete");
    },
    "onAddValue": function (index) {
      this.$emit("input", [
        ...this.value.slice(0, index + 1),
        "",
        ...this.value.slice(index + 1),
      ]);
    },
    "onDeleteValue": function (index) {
      this.$emit("input", [
        ...this.value.slice(0, index),
        ...this.value.slice(index + 1),
      ]);
    },
    "onUpdateValue": function (index, value) {
      this.$emit("input", [
        ...this.value.slice(0, index),
        value,
        ...this.value.slice(index + 1),
      ]);
    },
  },
};
</script>
