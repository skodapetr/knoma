<template>
  <div>
    <div>
      Properties:
      <v-btn
        text
        @click="onOpenPropertiesDialog"
      >
        Edit
      </v-btn>
      <v-btn
        text
        @click="onClear"
      >
        Clear
      </v-btn>
    </div>
    <div>
      <ul>
        <li
          v-for="(values, name) in visual"
          :key="name"
        >
          {{ name }}
          <ul>
            <li
              v-for="(item, index) in values"
              v-show="item !== ''"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <app-property-dialog
      v-model="properties"
      :visible="visible"
      :types="types"
      @save="onSavePropertiesDialog"
      @close="onClosePropertiesDialog"
    />
  </div>
</template>

<script>
import PropertyDialog from "../components/properties-dialog";
import {getDatabase} from "../database";
import {PredicateEditType} from "../database";

export default {
  "name": "PropertyFilter",
  "components": {
    "app-property-dialog": PropertyDialog,
  },
  "props": {
    "value": {"type": Object, "required": true},
  },
  "data": () => ({
    // Local copy of the data.
    "properties": {},
    "visible": false,
    "types": [],
    "visual": {},
  }),
  "watch": {
    "value.properties": async function (oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
      await this.computeVisual();
    },
  },
  "methods": {
    "onOpenPropertiesDialog": function () {
      this.properties = copyProperties(this.value.properties);
      this.visible = true;
    },
    "onClear": function() {
      this.$emit("input", {
        ...this.value,
        "properties": {},
      });
      this.$emit("change");
    },
    "onSavePropertiesDialog": async function () {
      this.visible = false;
      this.$emit("input", {
        ...this.value,
        "properties": this.properties,
      });
      this.$emit("change");
    },
    "onClosePropertiesDialog": function () {
      this.visible = false;
    },
    "computeVisual": async function () {
      const database = getDatabase();
      const properties = {};
      (await database.getPredicates()).map(item => properties[item.iri] = item);
      const result = {};
      for (const [iri, values] of Object.entries(this.value.properties)) {
        const property = properties[iri];
        let valuesToShow = [];
        switch (property.type) {
          case PredicateEditType.Codelist:
            for (const value of values) {
              valuesToShow.push(await database.getLabel(value));
            }
            break;
          default:
            valuesToShow = values;
            break;
        }
        result[property.label] = valuesToShow;
      }
      this.visual = Object.freeze(result);
    },
  },
};

function copyProperties(properties) {
  const result = {};
  for (const [key, value] of Object.entries(properties)) {
    result[key] = [...value];
  }
  return result;
}

</script>