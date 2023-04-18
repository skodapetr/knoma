<template>
  <div>
    <div>
      Types:
      &nbsp;
      <v-btn
        icon="mdi-plus"
        size="x-small"
        @click="onAddInclude"
      />
      &nbsp;
      <v-btn
        icon="mdi-minus"
        size="x-small"
        @click="onAddExclude"
      />
    </div>
    <div class="tag-line">
      <v-chip
        v-for="(tag, index) in tags"
        :key="tag.iri"
        :color="tag.include ? 'green' : 'red'"
        size="small"
        class="mr-2"
        closable
        @click:close="onRemoveType(index)"
      >
        {{ tag.label }}
      </v-chip>
    </div>
    <app-codelist-dialog
      v-model="dialog.items"
      :visible="dialog.visible"
      :codelist="['http://www.w3.org/2000/01/rdf-schema#Class']"
      :multiple="false"
      @save="onSaveTypeDialog"
      @close="onCloseTypeDialog"
    />
  </div>
</template>

<script>
import CodelistDialog from "../components/codelist-dialog";
import {getDatabase} from "../database";

export default {
  "name": "TypeFilter",
  "components": {
    "app-codelist-dialog": CodelistDialog,
  },
  "props": {
    "value": {"type": Object, "required": true},
  },
  "emits": [
    "input",
    /**
     * Input value has changed.
     */
    "change",
  ],
  "data": () => ({
    "dialog": {
      "items": [],
      "visible": false,
      "include": true,
    },
    "tags": [],
  }),
  "watch": {
    "value.types": function (oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      this.computeTags();
    },
  },
  "methods": {
    "onAddInclude": function () {
      this.dialog.visible = true;
      this.dialog.include = true;
    },
    "onAddExclude": function () {
      this.dialog.visible = true;
      this.dialog.include = false;
    },
    "onSaveTypeDialog": function (value) {
      this.dialog.visible = false;
      this.dialog.items = [];
      if (value.length === 0) {
        // No value.
        return;
      }
      const iri = value[0];
      // Check if the element is already in the list.
      for (const index in this.value.types) {
        const item = this.value.types[index];
        if (item.iri !== iri) {
          continue;
        }
        if (item.include === this.dialog.include) {
          // Item is already stored.
          return;
        }
        // Just update include and cancel.
        this.$emit("input", {
          ...this.value,
          "types": [
            ...this.value.types.slice(0, index),
            {
              "iri": iri,
              "include": this.dialog.include,
            },
            ...this.value.types.slice(index + 1),
          ],
        });
        this.$emit("change");
        return;
      }
      // There is no such element.
      this.$emit("input", {
        ...this.value,
        "types": [
          ...this.value.types,
          {
            "iri": iri,
            "include": this.dialog.include,
          },
        ],
      });
      this.$emit("change");
    },
    "computeTags": async function () {
      const result = [];
      const database = getDatabase();
      for (const item of this.value.types) {
        result.push({
          "iri": item.iri,
          "label": await database.getLabel(item.iri),
          "include": item.include,
        });
      }
      this.tags = result;
    },
    "onCloseTypeDialog": function () {
      this.dialog.visible = false;
      this.dialog.items = [];
    },
    "onRemoveType": function(index) {
      this.$emit("input", {
        ...this.value,
        "types": [
          ...this.value.types.slice(0, index),
          ...this.value.types.slice(index + 1),
        ],
      });
      this.$emit("change");
    },
  },
};
</script>

<style scoped>

.tag-line {
  margin: 0.5rem;
}

</style>