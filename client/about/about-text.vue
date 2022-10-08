<template>
  <section>
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
        You can use <code>```Quote...</code> to mark a quote from the source
        document.
      </li>
      <li>
        Item list:
        <pre><code>* Item
   * Item
   * Item</code></pre>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  "name": "AboutText",
};
</script>
