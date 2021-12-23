<template>
  <v-container>
    <h2>Content language</h2>
    <ul>
      <li>
        <code>\url{IRI}</code> - Reference to an external document.
      </li>
      <li>
        <code>\doi{DOI}</code> - Reference to an article defined with DOI.
      </li>
      <li>
        <code>\keyword{text}</code> - Mark given text as a keyword.
      </li>
      <li>
        <code>\cite{number}</code> - A citation, reference to the references
        section of an article. They should be replaced with
        <code>\url{IRI}</code> or <code>\doi{DOI}</code>, with the second
        being the preferred option.
      </li>
      <li>
        <code>\begin{itemize} \item ... \end{itemize}</code> - Create a list
        of items in LaTeX style.
      </li>
      <li>
        <code>\begin{anchor}{name} ... \end{anchor}</code> - Create an anchor
        so the text can be references by other notes and documents.
      </li>
      <li>
        <code>\begin{quote} ... \end{quote}</code> - Represent exact copy of a
        text from the source.
      </li>
      <li>
        <code>\begin{code} ... \end{code}</code> - Represent a source code.
      </li>
    </ul>
    <h2>Types</h2>
    <ul>
      <li>
        <code>Concept Scheme</code> - A concept lists that can be used as
        values in codelists.
      </li>
      <li>
        <code>Concept</code> - Member of concept scheme.
      </li>
      <li>
        <code>Property</code> - This document can be used as a property.
      </li>
    </ul>
    <h2>Predicates</h2>
    <ul>
      <li>
        <code>In scheme</code> - Part of a given codelist.
      </li>
      <li>
        <code>URL</code>
      </li>
      <li>
        <code>DOI</code>
      </li>
      <li>
        <code>Published</code> - Time when the document were published/created.
      </li>
      <li>
        <code>Reference</code> - Can be used to connect notes together.
      </li>
    </ul>
    <h2>Keyboard</h2>
    <ul>
      <li>
        <code>ctrl + s</code> - In document detail, save current document.
      </li>
      <li>
        <code>alt + q</code> - In note text area, insert quote.
      </li>
      <li>
        <code>alt + c</code> - In note text area, insert code.
      </li>
      <li>
        <code>alt + a</code> - In document detail, append new note.
      </li>
      <li>
        <code>alt + up</code> - In note text area, focus previous note.
      </li>
      <li>
        <code>alt + down</code> - In note text area, focus next note.
      </li>
    </ul>
  </v-container>
</template>

<script>
export default {
  "name": "About",
};
</script>
