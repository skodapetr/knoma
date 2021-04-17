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
    <app-tags
      :value="value.types"
      small
      @click="onEditType"
    />
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
import TagLine from "../components/tag-line";

export default {
  "name": "TypeHeader",
  "components": {
    "app-tags": TagLine,
  },
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