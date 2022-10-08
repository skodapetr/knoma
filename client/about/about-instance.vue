<template>
  <section>
    <h2>Instance</h2>
    <dl>
      <dt>Database:</dt>
      <dd>{{ database }}</dd>
    </dl>
  </section>
</template>

<script>
import {getDatabase} from "../database";

export default {
  "name": "AboutInstance",
  "data": () => ({
    "database": getDatabase().getDatabaseLabel(),
  }),
};
</script>