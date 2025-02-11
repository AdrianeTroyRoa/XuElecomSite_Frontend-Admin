<template>
  <!--for margin purposes-->
  <div class="w-full my-24"></div>

  <!--fixed-positioned navbar-->
  <div
    class="navbar flex justify-center items-center justify-between bg-gray-100 fixed w-full top-0 z-20 h-24"
  >
    <!-- Sidebar button -->
    <div>
      <Sidebar :title="title" />
    </div>

    <!-- Logout Button -->
    <div>
      <button
        type="button"
        class="btn btn-primary btn-ghost"
        @click="handleLogout()"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const router = useRouter();
defineProps({ title: String });

async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("failed to sign out:", error.message);
  } else {
    console.info("👋 user logged out");
  }

  router.push("/login");
}
</script>
