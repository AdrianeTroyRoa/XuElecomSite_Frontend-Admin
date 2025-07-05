<template>
  <div
    class="bg-white border-2 border-black shadow overflow-hidden sm:rounded-md max-w-3xl mx-auto my-4"
  >
    <div class="px-4 py-5 sm:px-6">
      <div class="flex items-center justify-between">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ title }}
        </h3>
        <NuxtLink
          class="font-medium text-indigo-600 hover:text-indigo-500"
          :to="{
            name: 'articles-edit-id',
            params: { id: id },
            query: { title: title },
          }"
        >
          Edit
        </NuxtLink>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <p class="mt-1 max-w-2xl text-sm font-medium text-gray-500">
          Date Created: {{ createdAt }}
        </p>
        <p class="text-sm font-medium text-gray-500">
          Status:
          <span v-if="status" class="text-green-600"> Live </span>
          <span v-else class="text-yellow-600"> Draft </span>
        </p>
      </div>
      <p class="mt-1 max-w-2xl text-sm font-medium text-gray-500">
        Date Updated: {{ updatedAt }}
      </p>
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
});
</script>
