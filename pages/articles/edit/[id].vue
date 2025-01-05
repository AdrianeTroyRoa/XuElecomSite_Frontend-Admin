<template>
  <div class="flex p-4">
    <div class="flex-1">
      <div
        class="text-4xl font-bold focus:outline-dashed mr-7 focus:p-3"
        contenteditable="true"
        @input="updateArticleTitle"
        spellcheck="true"
      >
        {{ articleTitle }}
      </div>
      <div class="ml-4 text-xs">{{ formattedDateToday }}</div>
    </div>
    <button class="btn btn-secondary flex-none" @click="showInputtedContent">
      Save
    </button>
  </div>
  <div class="flex flex-col md:flex-row w-full">
    <div class="w-full md:w-1/2 p-4">
      <div class="text-3xl">Markdown Editor</div>
      <hr />
      <br />
      <!-- Input field for markdown -->
      <textarea
        v-model="markdownContent"
        placeholder="Write your markdown here..."
        rows="10"
        cols="50"
        class="bg-zinc-100 w-full h-[calc(100vh-13rem)] font-mono p-4"
      ></textarea>
    </div>
    <!-- Rendered markdown output -->
    <div class="w-full md:w-1/2 p-4">
      <div class="text-3xl">Preview</div>
      <hr />
      <br />
      <div class="bg-zinc-100 p-4 w-full h-[calc(100vh-13rem)] overflow-y-auto">
        <div class="flex align-items-center">
          <article class="prose" v-html="renderMarkdown"></article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import the markdown parser
import { marked } from "marked";
const route = useRoute();

// Reactive variable for articleTitle
const articleTitle = ref(route.query.titles);

function updateArticleTitle(event) {
  articleTitle.value = event.target.innerText;
}

// Reactive content for displaying the datetime
const dateToday = ref(new Date());
const dateOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  weekday: "short",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZoneName: "short",
};
const formattedDateToday = computed(() => {
  return dateToday.value.toLocaleDateString("en-US", dateOptions);
});

// to update the date every second
let interval;

onMounted(() => {
  interval = setInterval(() => {
    dateToday.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval); // Clear the interval when the component is destroyed
});

// Reactive variable to store markdown content
const markdownContent = ref(`
# Markdown Basics

## Headers
You can create headers by using the \`#\` symbol:
# Heading 1
## Heading 2
### Heading 3

## Emphasis
You can emphasize text by making it **bold** or *italic*:
- **Bold**: \`\*This is bold text\*\`
- *Italic*: \`\*This is italic text\*\`

## Lists
You can create ordered and unordered lists:
- Unordered list:
  - Item 1
  - Item 2
    - Subitem 2.1
- Ordered list:
1. First item
2. Second item

## Links
To create a link, use the following syntax:
[OpenAI](https://www.openai.com)

## Images
To add an image, use the syntax:
![Alt text](https://cdn.bhdw.net/im/dark-nature-sunset-wallpaper-120990_w635.webp "Image Title")

## Blockquotes
You can create blockquotes by starting a line with \`>\`:
> This is a blockquote.

`);

// Computed property to convert markdown to HTML
const renderMarkdown = computed(() => marked(markdownContent.value));

function showInputtedContent() {
  console.log(markdownContent.value);
}
</script>
