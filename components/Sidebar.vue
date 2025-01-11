<template>
  <!--Something wrong here-->
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <label htmlFor="my-drawer" class="btn drawer-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <rect y="4" width="24" height="2"></rect>
          <rect y="11" width="24" height="2"></rect>
          <rect y="18" width="24" height="2"></rect>
        </svg>
      </label>
    </div>

    <div class="drawer-side">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <button class="btn btn-ghost hover:bg-base-200 mb-12">
          <div>
            <div class="text-xl text-primary font-bold">BOTAR ATENISTA</div>
            <div
              class="rounded-full bg-[#FAD60B] p-1 px-12 shadow-black shadow-md font-bold"
            >
              THINK. ACT. VOTE.
            </div>
          </div>
        </button>
        <li><a class="text-xl font-bold" href="/articles">Articles</a></li>
        <li><a class="text-xl font-bold" href="/questions">Questions</a></li>
      </ul>
    </div>
  </div>
</template>

<script></script>
