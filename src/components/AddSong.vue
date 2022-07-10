<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = !showForm">Add Songs</button>
    <form @submit.prevent="handleSubmit" v-if="showForm">
      <h4>Add a New Song</h4>
      <input
        :disabled="isPending"
        type="text"
        placeholder="Song title"
        required
        v-model="title"
      />
      <input
        :disabled="isPending"
        type="text"
        placeholder="Artist"
        required
        v-model="artist"
      />
      <button>Add</button>
      <button class="hide" @click.prevent="showForm = !showForm">Hide</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useDocument from "@/composables/useDocument";

export default {
  props: ["playlist"],
  setup(props) {
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);
    const { updateDocument } = useDocument("playlists", props.playlist.id);
    const isPending = ref(false);

    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000),
      };
      isPending.value = true;

      await updateDocument({
        songs: [...props.playlist.songs, newSong],
      });

      title.value = "";
      artist.value = "";

      isPending.value = false;
    };

    return { title, artist, showForm, handleSubmit, isPending };
  },
};
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}

.hide {
  margin-left: 5px;
}
</style>
