<template>
  <div class="user-playlists">
    <h2>My playlists</h2>
    <div v-if="playlists">
      <ListView v-if="playlists.length" :playlists="playlists"></ListView>
      <div v-else class="error">No playlists</div>
    </div>
    <SpinnerElem v-else></SpinnerElem>
    <router-link class="btn" :to="{ name: 'create-playlist' }"
      >Create new playlist</router-link
    >
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import ListView from "@/components/ListView.vue";
import SpinnerElem from "@/components/SpinnerElem.vue";
export default {
  setup() {
    const { user } = getUser();
    const { documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);
    return { playlists };
  },
  components: { ListView, SpinnerElem },
};
</script>

<style></style>
