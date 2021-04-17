<template>
  <v-dialog
    :value="visible"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @keydown.esc="onClose"
  >
    <v-card>
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          @click="onSave"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Properties</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            icon
            @click="onClose"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list>
        <v-list-item
          v-for="entry in Object.entries(value)"
          :key="entry[0]"
        >
          <v-list-item-title>
            <app-property-edit
              :predicate="entry[0]"
              :value="entry[1]"
              @input="(v) => onChange(entry[0], v)"
              @delete="onDelete(entry[0])"
            />
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <app-property-selector @add="onAdd" />
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import PropertyEdit from "./properties-dialog-item";
import PropertySelector from "./property-selector";

export default {
  "name": "PropertiesDialog",
  "components": {
    "app-property-edit": PropertyEdit,
    "app-property-selector": PropertySelector,
  },
  "props": {
    "value": {"type": Object, "required": true},
    "visible": {"type": Boolean, "required": true},
  },
  "methods": {
    "onChange": function (key, value) {
      this.$emit("input", {
        ...this.value,
        [key]: value,
      });
    },
    "onDelete": function (key) {
      const newValue = {...this.value};
      delete newValue[key];
      this.$emit("input", newValue);
    },
    "onAdd": function (predicate) {
      if (this.value[predicate.iri] !== undefined) {
        return;
      }
      this.$emit("input", {
        ...this.value,
        [predicate.iri]: [""],
      });
    },
    "onSave": function() {
      this.$emit("save");
    },
    "onClose": function() {
      this.$emit("close");
    },
  },
};
</script>
