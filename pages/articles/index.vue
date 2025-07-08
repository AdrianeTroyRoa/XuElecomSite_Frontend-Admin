<template>
  <Navbar title="Articles" />
  <div>
    <Searchbar @click-button="handleSearch" />
  </div>
  <div class="text-center">
    <div class="filter flex gap-2 justify-center mb-5">
      <input
        class="btn filter-reset"
        type="radio"
        name="metaframeworks"
        aria-label="All"
        checked
        @click="handleCategory('all')"
      />
      <input
        class="btn"
        type="radio"
        name="metaframeworks"
        aria-label="Articles"
        @click="handleCategory('article')"
      />
      <input
        class="btn"
        type="radio"
        name="metaframeworks"
        aria-label="Memoranda"
        @click="handleCategory('memorandum')"
      />
      <input
        class="btn"
        type="radio"
        name="metaframeworks"
        aria-label="Resolutions"
        @click="handleCategory('resolution')"
      />
    </div>
  </div>
  <div class="text-center">
    <CreateArticle />
  </div>
  <div v-if="posts.length !== 0" v-for="item in posts">
    <ArticleItem
      :title="item.title"
      :status="item.status"
      :createdAt="item.dateCreated"
      :updatedAt="item.dateUpdated"
      :id="item.id"
      :content="item.content"
      :postType="item.type"
      :titleStartPos="item.searchCharStartAtTitle"
      :contentStartPos="item.searchCharStartAtContent"
      :searchLength="item.searchLength"
    />
  </div>
  <div v-else class="text-center mt-24 italic text-xl">
    No articles match this search.
  </div>
</template>
<script setup lang="ts">
const posts = ref([]);
const category = ref("");
const searchFilter = ref("");

//supabase fetching
const client = useSupabaseClient();
const maxDescLength = 200;

const { data, error } = await client
  .from("Posts")
  .select()
  .order("updated_at", { ascending: false });

if (error) {
  console.error(error);
} else {
  //transferring data values to post
  syncPostsFromDB(data);

  ////logging to see number of posts
  console.info("Posts number:", posts.value.length);
  //logging to see data collected
  posts.value.forEach((data) => {
    console.log("title:", data.title);
    console.log("description:", data.content);
    console.log("date:", data.dateUpdated);
  });
}

function syncPostsFromDB(data) {
  posts.value = data.map((post) => ({
    ...post,
    content:
      post.content.length > maxDescLength
        ? post.content.slice(0, maxDescLength).concat("...")
        : post.content,
    dateCreated: post.created_at,
    dateUpdated: post.updated_at,
  }));
}

function handleSearch(res) {
  if (category.value !== "all") handleCategory(category.value);
  else syncPostsFromDB(data);

  searchFilter.value = res;

  const displayPosts = posts.value.filter(
    (post) => post.title.includes(res) ?? post.content.includes(res),
  );

  posts.value = displayPosts.map((post) => ({
    ...post,
    searchCharStartAtTitle: post.title.indexOf(res),
    searchCharStartAtContent: post.content.indexOf(res),
    searchLength: res.length,
  }));
}

function handleCategory(localCategory) {
  console.log("Filter was clicked:", localCategory);
  category.value = localCategory;

  syncPostsFromDB(data);
  let displayPosts = "";

  if (category.value !== "all") {
    displayPosts = posts.value.filter(
      (post) =>
        (post.type.toLowerCase() == category.value &&
          post.title.includes(searchFilter.value)) ??
        post.content.includes(searchFilter.value),
    );
    posts.value = displayPosts.map((post) => ({
      ...post,
    }));
  } else handleSearch(searchFilter.value);
}
</script>
