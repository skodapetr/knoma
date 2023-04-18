<template>
  <v-container class="pt-0">
    <app-header
      v-model="document"
      @edit-properties="onOpenPropertiesDialog"
      @edit-type="onOpenTypeDialog"
      @save="onSave"
      @close="onClose"
    />
    <br>
    <app-items
      v-model="document.items"
      :document-iri="document.iri"
      @edit-properties="onOpenPropertiesDialog"
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
      @save="onSaveTypeDialog"
      @close="onCloseTypeDialog"
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
import {nextTick} from "vue";
import Header from "./document-detail-header";
import Items from "./document-detail-notes";
import PropertyDialog from "../components/properties-dialog";
import CodelistDialog from "../components/codelist-dialog";
import {createDocument, getDatabase} from "../database";
import {
  createNewNote,
  focusNextNote,
  focusPreviousNote,
  getTextAreas,
} from "./document-detail-service";
import {NOTE} from "../database/predefined";

export default {
  "name": "DocumentDetailView",
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
  "mounted": async function () {
    window.document.addEventListener("keydown", this.onKeyDown);
    const iri = this.$route.query.document;
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
  "unmounted": function () {
    window.document.removeEventListener("keydown", this.onKeyDown);
  },
  "methods": {
    "onKeyDown": function (event) {
      if (event.ctrlKey && event.key === "s") {
        this.onSave();
        event.preventDefault();
      } else if (event.altKey && event.key === "a") {
        this.document.items = [
          ...this.document.items,
          createNewNote(this.document.iri, this.document.items),
        ];
        nextTick(() => {
          getTextAreas().pop().focus();
        });
        event.preventDefault();
      } else if (event.altKey && event.key === "ArrowUp") {
        focusPreviousNote();
        event.preventDefault();
      } else if (event.altKey && event.key === "ArrowDown") {
        focusNextNote();
        event.preventDefault();
      }
    },
    "onOpenPropertiesDialog": function (owner) {
      this.propertyDialog = {
        "open": true,
        "owner": owner,
        // The note has no types, se we substitute with note type here.
        "types": owner?.types ?? [NOTE],
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
    "onOpenTypeDialog": function (owner) {
      this.typeDialog = {
        "open": true,
        "owner": owner,
        // Clone data to not modify them in place.
        "data": [...owner.types],
      };
    },
    "onSaveTypeDialog": function () {
      this.typeDialog.owner.types = this.typeDialog.data;
      this.typeDialog.open = false;
    },
    "onCloseTypeDialog": function () {
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
