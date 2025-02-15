<template>
  <div class="flex p-4">
    <div class="flex-1">
      <Sidebar title="Article Editor" />
    </div>
    <button class="btn btn-secondary flex-none" @click="showInputtedContent">
      Save
    </button>
  </div>
  <div class="flex flex-col md:flex-row w-full">
    <div class="w-full md:w-1/2 p-4">
      <div class="text-3xl">Markdown</div>
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
        <article class="mb-48">
          <h1 class="text-5xl font-bold">{{ post.title }}</h1>
          <div class="text-xs mt-5">{{ formattedDateToday }}</div>
        </article>
        <div class="flex flex-col items-center">
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
const articleTitle = ref(route.query.title);

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

//fetching info from supabase
const supabase = useSupabaseClient();
const post = ref({});

const { data, error } = await supabase
  .from("Posts")
  .select()
  .eq("id", route.params.id)
  .single();

const markdownContent = ref("");
if (error) console.error("❌ cannot fetch article");
else {
  post.value = data;
  console.log(data);
  markdownContent.value = post.value.content;
}

// Computed property to convert markdown to HTML
const renderMarkdown = computed(() =>
  marked(markdownContent.value || "Hello. Error exists."),
);

function showInputtedContent() {
  console.log(markdownContent.value);
}
</script>
