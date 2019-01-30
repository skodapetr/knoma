<template>
  <div>
    <v-layout 
      v-for="(url, index) in value" 
      :key="index" 
      row>
      <v-flex xs1>
        <button @click="onAdd(index)">
          <v-icon color="green">add_circle_outline</v-icon>
        </button>
        <button @click="onDelete(index)">
          <v-icon color="red">delete</v-icon>
        </button>
      </v-flex>
      <v-flex xs11>
        <v-text-field 
          :value="url" 
          :label="label" 
          @input="(v) => onUpdate(index, v)"/>
      </v-flex>
    </v-layout>
    <button 
      v-if="value.length === 0" 
      @click="onAdd()">
      <v-icon>add_circle_outline</v-icon>
    </button>
  </div>
</template>

<script>
  export default {
    "name": "app-url-list",
    "props": {
      "value": {"type": Array, "required": true},
      "label": {"type": String}
    },
    "methods": {
      "onAdd": function (index) {
        const newValue = [
          ...this.value.slice(0, index + 1),
          "",
          ...this.value.slice(index + 1)
        ];
        this.$emit("input", newValue);
      },
      "onDelete": function (index) {
        const newValue = [
          ...this.value.slice(0, index),
          ...this.value.slice(index + 1)
        ];
        this.$emit("input", newValue);
      },
      "onUpdate": function (index, value) {
        const newValue = [
          ...this.value.slice(0, index),
          value,
          ...this.value.slice(index + 1)
        ];
        this.$emit("input", newValue);
      }
    }
  }
</script>