<template>
  <div class="flex min-h-screen justify-center items-center bg-zinc-100">
  <div
    class="w-1/4 px-6 py-12 lg:px-8 bg-white shadow overflow-hidden sm:rounded-md max-w-3xl mx-auto my-4"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-20 rounded-full object-cover w-auto"
        src="/public/logo.jpg"
        title="XU CSG Elecom"
        alt="XU CSG Elecom"
      />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="username"
            class="block text-sm/6 font-medium text-gray-900"
            >Username</label
          >
          <div class="mt-2">
            <input
              type="text"
              name="username"
              id="username"
              required=""
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2 relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              name="password"
              id="password"
              autocomplete="current-password"
              required=""
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <button
              type="button"
              @click="updateShowPassword"
              class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
                v-if="showPassword"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5c7 0 10 7 10 7s-3 7-10 7-10-7-10-7 3-7 10-7z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9a3 3 0 100 6 3 3 0 000-6z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
                v-else
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223C3.214 9.428 2 11 2 11s3 7 10 7c2.257 0 4.136-.748 5.6-1.873M9.053 9.29A3 3 0 1114.7 14.7M9.529 4.775A11.966 11.966 0 0112 4.5c7 0 10 7 10 7s-.794 1.852-2.353 3.54M3 3l18 18"
                />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
const showPassword = ref(false);

function updateShowPassword() {
  showPassword.value = !showPassword.value;
}
</script>
