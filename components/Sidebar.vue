<template>
  <div class="relative">
    <!-- Hamburger Button -->
    <button
      @click="toggleSidebar"
      class="fixed top-4 left-4 z-50 p-2 rounded-md"
    >
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

    <!-- Sidebar -->
    <div
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
      }"
      class="text-white fixed top-0 left-0 h-full w-64 bg-neutral transform transition-transform duration-300 ease-in-out"
    >
      <ul class="p-4 space-y-4 mt-24">
        <li>
          <a href="/" class="block p-2 rounded-md hover:bg-gray-700">Home</a>
        </li>
        <li>
          <a href="/articles" class="block p-2 rounded-md hover:bg-gray-700">Articles</a>
        </li>
        <li>
          <a href="/questions" class="block p-2 rounded-md hover:bg-gray-700">Questions</a>
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
</script>
