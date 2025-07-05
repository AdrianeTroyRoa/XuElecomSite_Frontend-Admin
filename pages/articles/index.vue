<template>
  <Navbar title="Articles" />
  <div class="text-center">
    <CreateArticle />
  </div>
  <div v-for="(item, key) in posts">
    <ArticleItem
      :title="item.title"
      :status="item.status"
      :description="item.description"
      :id="item.id"
      :imageLink="item.image_link"
      :content="item.content"
    />
  </div>
  <div class="text-center">
    <CreateArticle />
  </div>
</template>
<script setup lang="ts">
const posts = ref([]);

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
  posts.value = data.map((post) => ({
    ...post,
    content:
      post.content.length > maxDescLength
        ? post.content.slice(0, maxDescLength).concat("...")
        : post.content,
    date: post.created_at,
  }));
  ////logging to see number of posts
  console.info("Posts number:", posts.value.length);
  //logging to see data collected
  posts.value.forEach((data) => {
    console.log("title:", data.title);
    console.log("description:", data.content);
    console.log("date:", data.date);
  });
}
</script>
