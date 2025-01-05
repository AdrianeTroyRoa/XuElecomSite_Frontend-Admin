<template>
  <NuxtLink
    :to="{
      name: 'articles-edit-id',
      params: { id: 123 },
      query: { titles: 'Sample Title' },
    }"
  >
    Post 123
  </NuxtLink>
</template>
