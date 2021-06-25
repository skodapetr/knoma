<template>
  <v-container>
    <app-header
      v-model="document"
      @edit-properties="onOpenPropertiesDialog"
      @edit-type="onOpenNoteTypeDialog"
      @save="onSave"
      @close="onClose"
    />
    <app-items
      v-model="document.items"
      :iri="document.iri"
      @edit-properties="onOpenPropertiesDialog"
      @edit-type="onOpenNoteTypeDialog"
    />
    <app-property-dialog
      v-model="propertyDialog.data"
      :visible="propertyDialog.open"
      :types="propertyDialog.types"
      @save="onSavePropertiesDialog"
      @close="onClosePropertiesDialog"
    />
    <app-codelist-dialog
      v-model="typeDialog.data"
      :visible="typeDialog.open"
      :codelist="['http://www.w3.org/2000/01/rdf-schema#Class']"
      @save="onSaveNoteTypeDialog"
      @close="onCloseNoteTypeDialog"
    />
    <v-layout class="mt-6">
      <v-btn
        class="mr-4"
        @click="onSave"
      >
        Save
      </v-btn>
      <v-btn @click="onClose">
        Close
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import Header from "./Document-detail-header";
import Items from "./Document-detail-notes";
import PropertyDialog from "./properties-dialog";
import CodelistDialog from "./codelist-dialog";
import {createDocument, getDatabase} from "../database";

export default {
  "name": "DocumentDetail",
  "components": {
    "app-header": Header,
    "app-items": Items,
    "app-property-dialog": PropertyDialog,
    "app-codelist-dialog": CodelistDialog,
  },
  "data": () => ({
    "document": createDocument(),
    "loading": false,
    "propertyDialog": {
      "open": false,
      "owner": undefined,
      "types": [],
      "data": {},
    },
    "typeDialog": {
      "open": false,
      "owner": undefined,
      "data": [],
    },
  }),
  "mounted": async function (){
    const iri =  this.$route.query.document;
    if (iri === undefined) {
      return;
    }
    this.loading = true;
    const document = await getDatabase().getDocument(iri);
    if (document !== undefined) {
      this.document = document;
    }
    this.loading = false;
  },
  "methods": {
    "onOpenPropertiesDialog": function (owner) {
      this.propertyDialog = {
        "open": true,
        "owner": owner,
        "types": owner.types,
        "data": cloneProperties(owner.properties),
      };
    },
    "onClosePropertiesDialog": function () {
      this.propertyDialog.open = false;
    },
    "onSavePropertiesDialog": function () {
      this.propertyDialog.owner.properties = this.propertyDialog.data;
      this.propertyDialog.open = false;
    },
    "onOpenNoteTypeDialog": function (owner) {
      this.typeDialog = {
        "open": true,
        "owner": owner,
        "data": owner.types,
      };
    },
    "onSaveNoteTypeDialog": function () {
      this.typeDialog.owner.types = this.typeDialog.data;
      this.typeDialog.open = false;
    },
    "onCloseNoteTypeDialog": function () {
      this.typeDialog.open = false;
    },
    "onSave": async function () {
      this.loading = true;
      try {
        await getDatabase().storeDocument(this.document);
        this.$notify({
          "title": "Document saved.",
          "type": "success",
        });
      } catch (ex) {
        this.$notify({
          "title": "Can't save data.",
          "type": "error",
        });
        throw ex;
      }
      this.loading = false;
    },
    "onClose": function () {
      this.$router.push({
        "name": "documents",
      });
    },
  },
};

function cloneProperties(source) {
  const result = {};
  for (const [key, value] of Object.entries(source)) {
    if (Array.isArray(value)) {
      result[key] = [...value];
    } else if (typeof value === "object") {
      result[key] = {...value};
    } else {
      result[key] = value;
    }
  }
  return result;
}

</script>
