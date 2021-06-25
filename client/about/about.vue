<template>
  <v-container>
    <h2>Content language</h2>
    Inspired by LaTeX. It is possible to use only <code>\end</code> to close
    the last open element.
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
  </v-container>
</template>

<script>
export default {
  "name": "About",
};
</script>
