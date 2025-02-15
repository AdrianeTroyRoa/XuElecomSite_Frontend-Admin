<template>
  <div class="flex p-4">
    <div class="flex-1">
      <Sidebar title="Article Editor" />
    </div>
    <button
      class="btn btn-secondary flex-none"
      @click="showInputtedContent"
      onclick="document.getElementById('popup-modal').showModal()"
    >
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

  <dialog class="modal" id="popup-modal">
    <div class="modal-box">
      <form method="dialog">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          data-modal-hide="popup-modal"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500">
            Take this article live?
          </h3>
          <button
            data-modal-hide="popup-modal"
            type="button"
            class="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            @click="updateStatus(true)"
          >
            Yes
          </button>
          <button
            data-modal-hide="popup-modal"
            type="button"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900e bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            @click="updateStatus(false)"
          >
            No
          </button>
        </div>
      </form>
    </div>
  </dialog>
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

//saving edits
const router = useRouter();
const status = ref(false);

function updateStatus(val) {
  status.value = val;
  submitEdits();
}

async function submitEdits() {
  const { data, error } = await supabase
    .from("Posts")
    .update({ content: markdownContent.value, status: status.value })
    .eq("id", route.params.id);
  if (error) console.error("❌ failed to edit content");
  else console.info("✅ successfully edited");
  router.push("/articles");
}
</script>
