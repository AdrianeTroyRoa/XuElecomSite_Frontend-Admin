<template>
  <!--for margin purposes-->
  <div class="w-full my-24"></div>

  <!--fixed-positioned navbar-->
  <div class="navbar flex justify-center items-center bg-gray-100 fixed w-full top-0 z-20 p-4">
    <!-- Sidebar button -->
    <div class="flex-1">
      <Sidebar />
    </div>
    <div class="flex-1 text-2xl font-bold">Articles</div>

    <!-- Logout Button -->
    <div class="flex-none">
      <button class="btn btn-primary btn-ghost">Logout</button>
    </div>
  </div>
</template>
