<template>
  <v-menu
    ref="menu"
    v-model="visible"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        :value="value"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      ref="picker"
      :value="value"
      @change="onChange"
    />
  </v-menu>
</template>

<script>
export default {
  "name": "DatePicker",
  "props": {
    "value": {"type": String, "required": true},
  },
  "emits": [
    "input",
  ],
  "data": () => ({
    "visible": false,
  }),
  "watch": {
    "visible": function (value) {
      // Start with year every time.
      value && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  "methods": {
    "onChange": function (value) {
      this.$refs.menu.save(value);
      this.$emit("input", value);
    },
  },
};
</script>