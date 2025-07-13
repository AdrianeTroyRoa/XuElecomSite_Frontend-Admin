<template>
  <button class="btn btn-secondary" @click="toggleInfoModal">
    + Add New Article
  </button>
  <dialog class="modal" :open="showInfoModal">
    <div class="modal-box">
      <!--Modal close button-->
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="toggleInfoModal"
        >
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
        <div class="flex justify-center my-7">
          <select class="select" v-model="selectedType">
            <option disabled value="">Post Type</option>
            <option>Article</option>
            <option>Memorandum</option>
            <option>Resolution</option>
          </select>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
            Thumbnail Image
          </label>
          <div class="text-center mb-10">
            <input
              type="file"
              id="image"
              accept="image/*"
              className="file-input shadow shadow-outline"
              @change="handleFile"
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
const uniqueId = ref("");
const selectedType = ref("");
const imageFile = ref(null);
const showInfoModal = ref(false);

const content = `
# Markdown Basics
## Headers You can create headers by using the \`#\` symbol:

# Heading 1
## Heading 2
### Heading 3

## Emphasis
You can emphasize text by making it **bold** or *italic*: - **Bold**: \`\*This is bold text\*\` - *Italic*: \`\*This is italic text\*\`

## Lists
You can create ordered and unordered lists:
- Unordered list:
  - Item 1
  - Item 2
    - Subitem 2.1
- Ordered list:
  1. First item
  2. Second item
## Links
To create a link, use the following syntax: [OpenAI](https://www.openai.com)
## Images
To add an image, use the syntax: ![San Francisco Airport](https://upload.wikimedia.org/wikipedia/commons/d/d6/San_Francisco_International_Airport_at_night.jpg "San Francisco International Airport")

## Blockquotes
You can create blockquotes by starting a line with \`>\`:
> This is a blockquote.
`;

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

function handleFile(e: Event) {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  imageFile.value = file;
}

function errorCapture(errorMsg) {
  window.alert(errorMsg + "\nPlease try again.");
  console.error("❌", errorMsg);
  throw errorMsg;
}

async function submitInputs() {
  console.log("article title:", articleTitle.value);

  if (articleTitle.value === "") errorCapture("No article title.");

  if (imageFile.value) {
    const { data: uploadData, error: uploadError } = await client.storage
      .from("post-thumbnails")
      .upload(
        `${slugify(articleTitle.value)}/${imageFile.value.name}`,
        imageFile.value,
        {
          cacheControl: "3600",
          upsert: false,
        },
      );

    if (uploadError) errorCapture("failed to upload image.");

    const config = useRuntimeConfig();
    const pathToFile = `${config.public.supabaseUrl}/storage/v1/object/public/${uploadData.fullPath}`;
    const { data: postData, error: postError } = await client
      .from("Posts")
      .insert({
        title: articleTitle.value,
        image_link: pathToFile,
        type: selectedType.value,
        content: content,
        slug: slugify(articleTitle.value),
      })
      .select()
      .single();

    if (postError) errorCapture("failed to upload post information.");
    else {
      console.info("✅ post information uploaded successfully.");
      uniqueId.value = String(postData.id);
      console.log(postData.id);

      router.push({
        name: "articles-edit-id",
        params: { id: uniqueId.value },
        query: { title: articleTitle.value },
      });
    }
    console.log("to have upload feature first");
  } else errorCapture("No image thumbnail detected.");
}

function toggleInfoModal() {
  showInfoModal.value = !showInfoModal.value;
}
</script>
