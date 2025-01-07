<template>
  <button class="btn btn-secondary" onclick="my_modal_1.showModal()"> + Add New Article</button>
  <dialog class="modal" id="my_modal_1">
    <div class="modal-box">
      <!--Modal close button-->
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>

      <!--The form to gather initial article info-->
      <form class="px-8 pt-6 pb-8 mb-4 mt-5 w-full max-w-lg">
        <div class="text-4xl text-center mb-8">Compose New Article</div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Article Title
          </label>
          <input
            class="shadow appearance-none input input-bordered rounded w-full p-4 text-gray-700 focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            v-model="articleTitle"
            placeholder="Title"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
            Thumbnail Image
          </label>
          <input
            class="shadow appearance-none input input-bordered rounded w-full p-4 text-gray-700 focus:outline-none focus:shadow-outline"
            id="image"
            type="text"
            v-model="imageLink"
            placeholder="Image link"
          />
          <div class="flex items-center space-x-4">
            <hr class="flex-grow border-gray-300" />
            <span class="text-gray-500">or</span>
            <hr class="flex-grow border-gray-300" />
          </div>
          <div class="text-center mb-10">
            <input
              type="file"
              id="image"
              accept="image/*"
              className="file-input shadow shadow-outline"
            />
          </div>
        </div>
        <div class="text-center">
          <button
            class="btn btn-secondary font-bold rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="submitInputs"
          >
            <NuxtLink
              :to="{
                name: 'articles-edit-id',
                params: { id: 123 },
                query: { title: articleTitle },
              }"
            >
              Go to Editor
            </NuxtLink>
          </button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
console.log("Hello");

const articleTitle = ref("");
const imageLink = ref("");

function submitInputs() {
  console.log("article title:", articleTitle.value);
  console.log("image link", imageLink.value.replace(/\s+/g, ""));
}
</script>
