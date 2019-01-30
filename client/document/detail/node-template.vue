<template>
  <v-layout 
    row 
    wrap>
    <v-flex 
      xs6 
      sm1 
      md1/>
    <v-flex 
      class="template" 
      xs6 
      sm2 
      md1>
      <v-autocomplete
        v-model="type"
        :items="types"
        label="Type *"
        item-text="label" 
        item-value="value"
        required/>
    </v-flex>
    <v-flex 
      class="template" 
      xs12 
      sm8 
      md9>
      <div class="column">
        <v-textarea
          v-model="content"
          class="nodeContent"
          label="Start typing to create a new element"
          rows="1"
          auto-grow
          @input="onInput"/>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import Vue from "vue";

  export default {
    "name": "app-node-detail-template",
    "data": () => ({
      "type": "citation",
      "content": "",
      "types": [
        {"label": "Note", "value": "note"},
        {"label": "Citation", "value": "citation"},
        {"label": "Reference", "value": "reference"},
        {"label": "Abstract", "value": "abstract"},
        {"label": "Results", "value": "results"}
      ]
    }),
    "methods": {
      "onInput": function (value) {
        this.$emit("change", {
          "type": this.type,
          "content": value
        });
        // Reset value back to where it should be.
        Vue.nextTick().then(() => {
          this.content = "";
        });
      }
    }
  }
</script>

<style scoped>
  .template {
    background-color: #EFEFEF
  }
</style>