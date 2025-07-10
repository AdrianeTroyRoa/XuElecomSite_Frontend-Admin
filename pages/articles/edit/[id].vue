<template>
  <div class="flex p-4">
    <div class="flex-1">
      <button class="flex flex-row" @click="toggleUnsavePrompt">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="font-medium px-2">Go back to post list</div>
      </button>
    </div>
    <div class="p-3 font-bold text-sm">
      Status: <span :class="statusStyleColor">{{ showStatus() }}</span>
    </div>
    <button
      v-if="isUpdated"
      class="btn btn-secondary flex-none"
      @click="toggleSaveModal"
    >
      Save
    </button>
    <button v-else class="btn btn-secondary flex-none" disabled>Save</button>
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
        @input="thereIsUpdate"
      ></textarea>
    </div>
    <!-- Rendered markdown output -->
    <div class="w-full md:w-1/2 p-4">
      <div class="text-3xl">Preview</div>
      <hr />
      <br />
      <div class="bg-zinc-100 p-4 w-full h-[calc(100vh-13rem)] overflow-y-auto">
        <article class="mb-48 text-center">
          <h1 class="text-5xl font-bold">{{ post.title }}</h1>
          <div class="text-xs mt-5">{{ formattedDateToday }}</div>
        </article>
        <div>
          <img
            :src="post.image_link"
            class="w-full max-w-2xl mx-auto rounded-lg shadow-md object-cover"
            alt="article picture"
          />
        </div>
        <div class="flex flex-col items-center">
          <article class="prose" v-html="renderMarkdown"></article>
        </div>
      </div>
    </div>
  </div>

  <dialog class="modal" :open="showSaveModal">
    <div class="modal-box">
      <form method="dialog">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="toggleSaveModal()"
        >
          ✕
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
          <h3 class="mb-5 text-lg font-bold text-gray-500">
            Please choose how to save <br />
            <p class="font-normal italic text-sm">
              Do note choosing the "Save as Draft" option would make the post
              inaccessible to the public
            </p>
          </h3>
          <button
            type="button"
            class="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            @click="updateStatus(true)"
          >
            Save and Publish
          </button>
          <button
            type="button"
            class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900e bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-yellow-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            @click="updateStatus(false)"
          >
            Save as Draft
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
const showSaveModal = ref(false);
function toggleSaveModal() {
  showSaveModal.value = !showSaveModal.value;
}

const router = useRouter();

async function submitEdits() {
  const { data, error } = await supabase
    .from("Posts")
    .update({ content: markdownContent.value, status: isLive.value })
    .eq("id", route.params.id);
  if (error) console.error("❌ failed to edit content");
  else console.info("✅ successfully edited");
  router.push("/articles");
}

//"SAVE" button and showing post status - live or draft - at top
const isUpdated = ref(!post.value.status);
const isLive = ref(post.value.status);

function thereIsUpdate() {
  isUpdated.value = markdownContent.value !== post.value.content;
  isLive.value = !isUpdated.value;
}

function updateStatus(val) {
  isLive.value = val;
  submitEdits();
}
const draftStatusColor = "text-yellow-600";
const liveStatusColor = "text-green-600";
const statusStyleColor = ref(isLive.value ? liveStatusColor : draftStatusColor);

function showStatus() {
  statusStyleColor.value = isLive.value ? liveStatusColor : draftStatusColor;
  return isLive.value ? "Live" : "Draft";
}

//Unsave changes prompt
function toggleUnsavePrompt() {
  if (isUpdated.value) {
    if (
      confirm(
        "WARNING: Unsaved changes in this post. Proceeding may erase them. Continue?",
      )
    ) {
      router.push("/articles");
    }
  } else {
    router.push("/articles");
  }
}
</script>
