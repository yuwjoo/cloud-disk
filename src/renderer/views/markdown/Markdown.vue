<template>
  <div class="markdown-body" id="editor"></div>
  <!-- <un-i-zero-md src="http://localhost:3000/static/fixedBottomButton.md"></un-i-zero-md> -->
</template>

<script setup lang="ts" name="MarkdownView">
import '@/assets/styles/github-markdown.css';
import '@/assets/styles/github.css';
import axios from 'axios';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

onMounted(async () => {
  const marked = new Marked(
    markedHighlight({
      emptyLangClass: 'hljs',
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  const container = document.querySelector('#editor') as HTMLElement;
  const res = await axios({
    url: 'http://localhost:3000/static/fixedBottomButton.md',
    method: 'get'
  });
  container.innerHTML = await marked.parse(res.data);
});

// import ZeroMd from 'zero-md';

// customElements.define('un-i-zero-md', ZeroMd);
</script>
