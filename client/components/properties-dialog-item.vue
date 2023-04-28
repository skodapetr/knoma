<template>
  <v-list class="py-0">
    <v-list-subheader>
      <v-btn
        icon="mdi-minus"
        color="red"
        size="x-small"
        variant="text"
        @click="onDelete"
      />
      {{ definition.label }}
    </v-list-subheader>
    <v-list-item
      v-for="(content, index) in modelValue"
      :key="index"
    >
      <div class="flex">
        <v-btn
          v-if="definition.multiple"
          icon="mdi-plus"
          variant="text"
          size="small"
          @click="onAddValue(index)"
        />
        <v-btn
          v-if="definition.multiple"
          icon="mdi-minus"
          variant="text"
          size="small"
          @click="onDeleteValue(index)"
        />
        <v-text-field
          v-if="definition.type === 'date'"
          :model-value="content"
          type="date"
          density="compact"
          :hide-details="true"
          @update:model-value="(v) => onUpdateValue(index, v)"
        />
        <v-text-field
          v-if="definition.type === 'string'"
          :model-value="content"
          density="compact"
          :hide-details="true"
          @update:model-value="(v) => onUpdateValue(index, v)"
        />
        <v-select
          v-else-if="definition.type === 'codelist'"
          :model-value="content"
          :items="items"
          item-text="title"
          item-value="iri"
          density="compact"
          :hide-details="true"
          @update:model-value="(v) => onUpdateValue(index, v)"
        />
      </div>
    </v-list-item>
    <v-list-item v-if="modelValue.length === 0">
      <v-btn
        icon="mdi-plus"
        size="x-small"
        @click="onAddValue()"
      />
    </v-list-item>
  </v-list>
</template>

<script>
import {getDatabase} from "../database";

export default {
  "name": "PropertiesDialogItem",
  "props": {
    "predicate": {"type": String, "required": true},
    "modelValue": {"type": Array, "required": true},
  },
  "emits": [
    "update:model-value",
    /**
     * Delete item.
     */
    "delete",
  ],
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
      this.$emit("update:model-value", [
        ...this.modelValue.slice(0, index + 1),
        "",
        ...this.modelValue.slice(index + 1),
      ]);
    },
    "onDeleteValue": function (index) {
      this.$emit("update:model-value", [
        ...this.modelValue.slice(0, index),
        ...this.modelValue.slice(index + 1),
      ]);
    },
    "onUpdateValue": function (index, value) {
      this.$emit("update:model-value", [
        ...this.modelValue.slice(0, index),
        value,
        ...this.modelValue.slice(index + 1),
      ]);
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}
</style>
