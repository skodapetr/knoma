<template>
  <v-container>
    <h2>Content language</h2>
    <ul>
      <li>
        Link with given <em>name</em> and <em>URL</em>.<br>
        <code>[{name}}]({URL}})</code><br>
        There are some specific domains that can be used:
        <ul>
          <li>
            <code>doi://</code> - Reference to a document with DOI.
          </li>
          <li>
            <code>cite://</code> - Reference to a citation inside a document.
          </li>
        </ul>
      </li>
      <li>
        Highlight given word as important.<br>
        <code>**Keyword**</code>
      </li>
      <li>
        Code without any other specification.<br>
        <code>```code```</code>
      </li>
      <li>
        Code of given <em>{type}</em>:
        <pre><code>```{type}
...
```</code></pre>
        You can use <code>```Quote...</code> to mark a quote from the source document.
      </li>
      <li>
        Item list:
        <pre><code>* Item
 * Item
 * Item</code></pre>
      </li>
    </ul>
    <h2>Types</h2>
    <ul>
      <li>
        <code>Concept Scheme</code> -
        A concept lists that can be used as values in codelists.
      </li>
      <li>
        <code>Concept</code> -
        Member of concept scheme.
      </li>
      <li>
        <code>Property</code> -
        This document can be used as a property.
      </li>
    </ul>
    <h2>Predicates</h2>
    <ul>
      <li>
        <code>In scheme</code> -
        Part of a given codelist.
      </li>
      <li>
        <code>URL</code>
      </li>
      <li>
        <code>DOI</code>
      </li>
      <li>
        <code>Published</code> -
        Time when the document were published/created.
      </li>
      <li>
        <code>Reference</code> -
        Can be used to connect notes together.
      </li>
    </ul>
    <h2>Keyboard</h2>
    <ul>
      <li>
        <code>ctrl + s</code> -
        In document detail, save current document.
      </li>
      <li>
        <code>alt + a</code> -
        In document detail, append new note.
      </li>
      <li>
        <code>alt + up</code> -
        In note text area, focus previous note.
      </li>
      <li>
        <code>alt + down</code> -
        In note text area, focus next note.
      </li>
    </ul>
  </v-container>
</template>

<script>
export default {
  "name": "About",
};
</script>
