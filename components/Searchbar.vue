<template>
  <div class="flex flex-row items-center justify-center px-4 py-6">
    <div class="w-full max-w-md">
      <div class="relative">
        <input
          v-model="localSearchQuery"
          class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-lg pl-4 pr-28 py-2.5 transition duration-200 ease-in-out focus:outline-none focus:border-slate-500 hover:border-slate-400 shadow-sm focus:shadow"
          placeholder="Search articles..."
        />
        <button
          class="absolute top-1/2 right-2 -translate-y-1/2 flex items-center justify-center rounded-md bg-slate-800 py-2 px-4 text-sm text-white transition duration-200 hover:bg-slate-700 focus:bg-slate-700 active:bg-slate-600 shadow-sm hover:shadow-md focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          type="button"
          @click="searchButtonClick(localSearchQuery)"
        >
          Search
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(["clickButton"]);

const localSearchQuery = ref("");

function searchButtonClick(query) {
  emit("clickButton", query);
}
</script>
