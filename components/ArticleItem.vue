<template>
  <div
    class="bg-white shadow overflow-hidden sm:rounded-md max-w-3xl mx-auto my-4"
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
            params: { id: 123 },
            query: { title: title },
          }"
        >
          Edit
        </NuxtLink>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <img
          src="https://www.ricoh-imaging.co.jp/english/products/xg-1/ex/img/ex-pic07.jpg"
          style="width: 1; height: 1"
        />
      </div>
      <div class="mt-4 flex items-center justify-between">
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          {{ description }}
        </p>
        <p class="text-sm font-medium text-gray-500">
          Status:
          <span v-if="status" class="text-green-600"> Live </span>
          <span v-else class="text-yellow-600"> Draft </span>
        </p>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <p class="mt-1 text-sm text-gray-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  description: String,
  status: Boolean,
});
</script>
