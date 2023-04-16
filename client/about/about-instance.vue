<template>
  <section>
    <h2>Instance</h2>
    <dl>
      <dt>Database:</dt>
      <dd>{{ databaseLabel }}</dd>
    </dl>
  </section>
</template>

<script>
import {getDatabase} from "../database";

export default {
  "name": "AboutInstance",
  "data": () => ({
    "databaseLabel": getDatabase().getDatabaseLabel(),
  }),
};
</script>