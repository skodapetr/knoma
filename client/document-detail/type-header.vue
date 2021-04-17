<template>
  <div>
    <v-btn
      icon
      class="ml-2 mr-4"
      @click="onCopyIri"
    >
      <v-icon>
        mdi-share-variant
      </v-icon>
    </v-btn>
    <v-chip
      v-for="type in value.types"
      :key="type.iri"
      small
      @click="onEditType"
    >
      {{ type.title }}
    </v-chip>
    <v-btn
      v-show="value.types.length === 0"
      icon
      @click="onEditType"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  "name": "TypeHeader",
  "props": {
    "value": {"type": Object, "required": true},
  },
  "methods": {
    "onCopyIri": function () {
      navigator.clipboard.writeText(this.value.iri);
    },
    "onEditType": function () {
      this.$emit("edit-type", this.value);
    },
  },
};
</script>