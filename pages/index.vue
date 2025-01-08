<template>
  <Navbar />
  <!-- Add Article Button -->
  <div class="text-center my-5">
    <CreateArticle />
  </div>
  <div v-for="(item, key) in someSample">
    <ArticleItem
      :title="item.title"
      :status="item.status"
      :description="item.description"
    />
  </div>
  <!-- Add Article Button -->
  <div class="text-center my-5">
    <CreateArticle />
  </div>
</template>
<script setup lang="ts">
const theTitle = "Some dick";
const someSample = [
  { title: "Hello", status: false, description: "blind-sided" },
  { title: "Goodbye", status: true, description: "hand-sided" },
  { title: "Hi again", status: false, description: "head-sided" },
];
</script>
