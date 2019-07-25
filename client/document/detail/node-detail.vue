<template>
  <v-layout
    :style="style"
    row
    wrap
  >
    <div v-if="value['_']['level'] > 0">
      <v-icon>subdirectory_arrow_right</v-icon>
    </div>
    <v-flex
      xs6
      sm1
      md1
    >
      <div>
        <button @click="onAdd()">
          <v-icon color="green">
            add_circle_outline
          </v-icon>
        </button>
        <button
          style="margin-right: 1rem"
          @click="onDelete()"
        >
          <v-icon color="red">
            delete
          </v-icon>
        </button>
        <button
          v-if="!showDetail"
          @click="onToggle()"
        >
          <v-icon color="blue">
            expand_more
          </v-icon>
        </button>
        <button
          v-if="showDetail"
          @click="onToggle()"
        >
          <v-icon color="blue">
            expand_less
          </v-icon>
        </button>
      </div>
      <div style="margin-top: 0.5rem">
        <button>
          <v-icon
            color="blue"
            @click="onMoveLeft()"
          >
            keyboard_arrow_left
          </v-icon>
        </button>
        <button>
          <v-icon
            color="blue"
            @click="onMoveRight()"
          >
            keyboard_arrow_right
          </v-icon>
        </button>
      </div>
    </v-flex>
    <v-flex
      xs6
      sm2
      md1
    >
      <v-autocomplete
        v-model="value.type"
        :items="types"
        label="Type *"
        item-text="label"
        item-value="value"
        required
      />
    </v-flex>
    <v-flex
      xs12
      sm8
      md9
    >
      <div class="column">
        <v-textarea
          v-model="value.content"
          class="nodeContent"
          label="Content"
          rows="1"
          auto-grow
        />
      </div>
      <v-layout
        v-if="showDetail"
        row
        wrap
      >
        <v-flex xs12>
          <v-text-field
            v-model="value.url"
            label="URL"
          />
        </v-flex>
        <v-flex xs12>
          <app-tag-line-edit v-model="value.keywords" />
        </v-flex>
        <v-flex x12>
          <v-slider
            v-model="value.level"
            :tick-labels="priorities"
            :max="priorities.length - 1"
            ticks="always"
          />
        </v-flex>
      </v-layout>
      <v-layout
        v-else
        class="overview"
      >
        <app-tag-line :value="value.keywords" />
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import TagLine from "./../ui/tag-line";
  import TagLineEdit from "./../ui/tag-line-editable";

  export default {
    "name": "app-node-detail",
    "components": {
      "app-tag-line": TagLine,
      "app-tag-line-edit": TagLineEdit
    },
    "props": {
      "value": {"type": Object, "required": true}
    },
    "data": () => ({
      "types": [
        {"label": "Note", "value": "note"},
        {"label": "Citation", "value": "citation"},
        {"label": "Reference", "value": "reference"},
        {"label": "Abstract", "value": "abstract"},
        {"label": "Results", "value": "results"}
      ],
      "priorities": [
        "Undefined",
        "Low",
        "Medium",
        "High"
      ],
      "showDetail": false
    }),
    "computed": {
      "style": function () {
        const margin = 2 * this.value["_"]["level"];
        return "padding-left: " + margin + "rem;";
      }
    },
    "methods": {
      "onAdd": function () {
        this.$emit("add", this.value);
      },
      "onDelete": function () {
        this.$emit("delete", this.value);
      },
      "onMoveLeft": function () {
        this.$emit("left", this.value);
      },
      "onMoveRight": function () {
        this.$emit("right", this.value);
      },
      "onToggle": function () {
        this.showDetail = !this.showDetail;
      }
    }
  }
</script>

<style scoped>
  .overview {
    margin-top: -1rem !important;
    margin-bottom: 0.5rem !important;;
  }
</style>