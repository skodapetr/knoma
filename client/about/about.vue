<template>
  <v-container>
    <h2>Content language</h2>
    <ul>
      <li>
        <code>\url{IRI}</code> - Reference to another source defined with IRI.
      </li>
      <li>
        <code>\doi{DOI}</code> - Reference to an article defined with DOI.
      </li>
      <li>
        <code>\keyword{text}</code> - Mark given text as a keyword, term.
      </li>
    </ul>
    <h2>Types</h2>
    <ul>
      <li>
        <code>Concept Scheme</code> - A concept lists that can be used as
        values in codelists.
      </li>
      <li>
        <code>Property</code> - This document can be used as a property.
      </li>
      <li>
        <code>Annotation</code> - Predefined codelist of annotations.
      </li>
    </ul>
    <h2>Predicates</h2>
    <ul>
      <li>
        <code>In scheme</code> - Part of a given codelist.
      </li>
      <li>
        <code>URL</code> - Source.
      </li>
      <li>
        <code>DOI</code> - Source.
      </li>
      <li>
        <code>Published</code> - Time when the document were published/created.
      </li>
      <li>
        <code>Annotation</code> - Values for predefined codelist.
      </li>
    </ul>
  </v-container>
</template>

<script>
export default {
  "name": "About",
};
</script>
