<template>
  <h2>{{ playlist.title }}</h2>

  <p class="username">Created by {{ playlist.userName }}</p>

  <p class="description">{{ playlist.description }}</p>

  <div v-if="ownership">
    <button class="edit">Edit</button>
    <button class="danger" @click="handleDelete" v-if="!isPending">
      Delete Playlist
    </button>
    <button class="danger" v-if="isPending" disabled>Deleting</button>
  </div>
</template>

<script>
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";

import { ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  props: {
    playlist: {},
    ownership: {},
    id: {},
  },
  setup(props) {
    const { deleteDocument } = useDocument("playlists", props.id);
    const { deleteImage } = useStorage();
    const router = useRouter();

    const isPending = ref(false);

    const handleDelete = async () => {
      const conf = confirm("Are you sure");

      if (conf) {
        isPending.value = true;

        await deleteImage(props.playlist.filePath);
        await deleteDocument();

        isPending.value = false;
        router.push({ name: "home" });
      }
    };

    return { handleDelete, isPending };
  },
};
</script>

<style></style>
