<template>
  <span>
    <app-chip
      v-for="item in value"
      :key="keyFnc(item)"
      :value="labelFnc(item)"
      outlined
      small
    />
  </span>
</template>

<script>
  import Chip from "./tag-chip";

  export default {
    "name": "app-tag-line",
    "components": {
      "app-chip": Chip
    },
    "props": {
      "value": {"type": Array, "required": false},
      "keyFnc": {"type": Function, "default": (value) => value},
      "labelFnc": {"type": Function, "default": (value) => value}
    }
  };
</script>
