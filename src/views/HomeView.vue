<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <ListView v-if="documents" :playlists="documents"></ListView>
    <SpinnerElem v-else></SpinnerElem>
  </div>
</template>

<script>
// @ is an alias to /src

import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView.vue";
import SpinnerElem from "@/components/SpinnerElem.vue";

export default {
  name: "HomeView",
  components: { ListView, SpinnerElem },
  setup() {
    const { documents, error } = getCollection("playlists");

    return { documents, error };
  },
};
</script>
