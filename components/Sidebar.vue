<template>
  <div class="relative">
    <!-- Hamburger Button -->
    <div class="fixed top-8 left-4 z-50 flex gap-4">
      <button @click="toggleSidebar" class="rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          v-if="isSidebarOpen"
          fill="white"
        >
          <rect y="4" width="24" height="2"></rect>
          <rect y="11" width="24" height="2"></rect>
          <rect y="18" width="24" height="2"></rect>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          v-else
        >
          <rect y="4" width="24" height="2"></rect>
          <rect y="11" width="24" height="2"></rect>
          <rect y="18" width="24" height="2"></rect>
        </svg>
      </button>
      <div class="font-bold text-2xl text-white" v-if="isSidebarOpen">{{ title ?? "" }}</div>
      <div class="font-bold text-2xl" v-else>{{ title ?? "" }}</div>
    </div>

    <!-- Sidebar -->
    <div
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
      }"
      class="text-white fixed top-0 left-0 h-full w-64 bg-accent transform transition-transform duration-300 ease-in-out"
    >
      <ul class="p-4 space-y-4 mt-24">
        <li>
          <a
            href="/"
            class="block p-2 rounded-md hover:bg-secondary hover:text-accent"
            >Home</a
          >
        </li>
        <li>
          <a
            href="/articles"
            class="block p-2 rounded-md hover:bg-secondary hover:text-accent"
            >Articles</a
          >
        </li>
        <li>
          <a
            href="/questions"
            class="block p-2 rounded-md hover:bg-secondary hover:text-accent"
            >Questions</a
          >
        </li>
      </ul>
    </div>

    <!-- Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
defineProps({ title: String });
</script>
