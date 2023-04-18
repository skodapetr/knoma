<template>
  <div>
    <div>
      Properties:
      &nbsp;
      <v-btn
        size="small"
        @click="onOpenPropertiesDialog"
      >
        Edit
      </v-btn>
      &nbsp;
      <v-btn
        size="small"
        @click="onClear"
      >
        Clear
      </v-btn>
    </div>
    <app-properties-preview :value="value" />
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
import PropertiesPreview from "../components/properties-preview";

export default {
  "name": "PropertyFilter",
  "components": {
    "app-property-dialog": PropertyDialog,
    "app-properties-preview": PropertiesPreview,
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
    // Local copy of the data.
    "properties": {},
    "visible": false,
    "types": [],
  }),
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