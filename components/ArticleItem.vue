<template>
  <div
    class="bg-white border-2 border-black shadow overflow-hidden sm:rounded-md max-w-3xl mx-auto my-4"
  >
    <div class="px-4 py-5 sm:px-6">
      <div class="flex items-center justify-between">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          <span v-for="(char, index) in title">
            <span
              v-if="
                index >= titleStartPos &&
                index <= titleStartPos + (searchLength - 1)
              "
              class="bg-primary text-white"
            >
              {{ char }}
            </span>
            <span v-else>
              {{ char }}
            </span>
          </span>
        </h3>
        <div class="relative">
          <button
            @click="toggleMenu"
            class="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
              />
            </svg>
          </button>

          <!--ellipsis menu-->
          <div
            v-if="isOpen"
            class="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10"
          >
            <ul class="py-1">
              <NuxtLink
                class="text-indigo-600 hover:text-indigo-500"
                :to="{
                  name: 'articles-edit-id',
                  params: { id: id },
                  query: { title: title },
                }"
              >
                <li
                  class="font-medium px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Edit
                </li>
              </NuxtLink>
              <button class="w-full text-justify" @click="toggleDeleteModal">
                <li
                  class="text-red-500 font-medium px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Delete
                </li>
              </button>
            </ul>
          </div>

          <!--Delete modal-->
          <dialog class="modal" :open="showDeleteModal">
            <div class="modal-box">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
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
                  <h3 class="mb-5 text-lg font-normal text-gray-500">
                    Delete "{{ title }}" permanently? This action is
                    irreversible.
                  </h3>
                  <button
                    class="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    @click="deletePost(id)"
                  >
                    Yes
                  </button>
                  <button
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900e bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                    @click="toggleDeleteModal"
                  >
                    No
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-between">
        <p
          v-if="createdAt === updatedAt"
          class="mt-1 max-w-2xl text-sm font-medium text-gray-500"
        >
          Date Updated: <i>Not yet updated</i>
        </p>
        <p v-else class="mt-1 max-w-2xl text-sm font-medium text-gray-500">
          Date Updated:
          <span class="font-light">{{
            formattedDateToday(new Date(updatedAt))
          }}</span>
        </p>
        <p class="text-sm font-medium text-gray-500">
          Status:
          <span v-if="status" class="text-green-600"> Live </span>
          <span v-else class="text-yellow-600"> Draft </span>
        </p>
      </div>
      <div class="flex items-center justify-between">
        <p class="max-w-2xl text-sm font-medium text-gray-500">
          Date Created:
          <span class="font-light">{{
            formattedDateToday(new Date(createdAt))
          }}</span>
        </p>
        <p class="text-sm font-medium text-gray-500">
          Type: <span class="font-light">{{ postType }}</span>
        </p>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <p class="mt-1 text-sm text-gray-500">
          {{ content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  status: Boolean,
  id: String,
  content: String,
  createdAt: String,
  updatedAt: String,
  postType: String,
  titleStartPos: Number,
  contentStartPos: Number,
  searchLength: Number,
});

const dateOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  month: "long",
  day: "numeric",
  year: "numeric",
};

const formattedDateToday = (dateToFormat) => {
  return dateToFormat.toLocaleString("en-US", dateOptions);
};

const isOpen = ref(false);
const showDeleteModal = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function toggleDeleteModal() {
  showDeleteModal.value = !showDeleteModal.value;
}

function deletePost(id) {
  window.alert("About to delete: " + id);
}
</script>
