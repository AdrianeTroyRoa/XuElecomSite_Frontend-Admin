<template>
  <button
    class="btn btn-secondary"
    onclick="document.getElementById('my_modal_1').showModal()"
  >
    + Add New Article
  </button>
  <dialog class="modal" id="my_modal_1">
    <div class="modal-box">
      <!--Modal close button-->
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>

      <!--The form to gather initial article info-->
      <form class="px-8 pt-6 pb-8 mb-4 mt-5 w-full max-w-lg">
        <div class="text-4xl text-center mb-8">Compose New Article</div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Article Title
          </label>
          <input
            class="shadow appearance-none input input-bordered rounded w-full p-4 text-gray-700 focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            v-model="articleTitle"
            placeholder="Title"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
            Thumbnail Image
          </label>
          <input
            class="shadow appearance-none input input-bordered rounded w-full p-4 text-gray-700 focus:outline-none focus:shadow-outline"
            id="image"
            type="text"
            v-model="imageLink"
            placeholder="Image link"
          />
          <div class="flex items-center space-x-4">
            <hr class="flex-grow border-gray-300" />
            <span class="text-gray-500">or</span>
            <hr class="flex-grow border-gray-300" />
          </div>
          <div class="text-center mb-10">
            <input
              type="file"
              id="image"
              accept="image/*"
              className="file-input shadow shadow-outline"
            />
          </div>
        </div>
        <div class="text-center">
          <button
            class="btn btn-secondary font-bold rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="submitInputs"
          >
            Go to Editor
          </button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const router = useRouter();

const articleTitle = ref("");
const imageLink = ref("");
const uniqueId = ref("");

//supabase fetching
const client = useSupabaseClient();

function slugify(title: String) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove multiple consecutive hyphens
}

async function submitInputs() {
  console.log("article title:", articleTitle.value);
  console.log("image link", imageLink.value.replace(/\s+/g, ""));
  const { data, error } = await client
    .from("Posts")
    .insert({
      title: articleTitle.value,
      image_link: imageLink.value,
      slug: slugify(articleTitle.value),
    })
    .select().single();

  if (error) console.error("❌ failed to upload post information.");
  else {
    console.info("✅ post information uploaded successfully.");
    uniqueId.value = String(data.id);
    console.log(data.id);

    router.push({
      name: "articles-edit-id",
      params: { id: uniqueId.value },
      query: { title: articleTitle.value },
    });
  }
}
</script>
