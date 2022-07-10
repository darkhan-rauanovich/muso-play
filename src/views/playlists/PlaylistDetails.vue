<template>
  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="playlist" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <CoverImg :playlist="playlist" :id="id" :ownership="ownership"></CoverImg>
      <TextInfo :playlist="playlist" :id="id" :ownership="ownership"></TextInfo>
    </div>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet.
      </div>

      <div v-for="(song, key) in playlist.songs" :key="key" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>

        <button @click="handleClick(song.id)" v-if="ownership">Delete</button>
      </div>

      <AddSong v-if="ownership" :playlist="playlist"></AddSong>
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";

import { computed, ref } from "@vue/runtime-core";

import AddSong from "@/components/AddSong.vue";
import CoverImg from "@/components/CoverImg.vue";
import TextInfo from "../../components/TextInfo.vue";

export default {
  props: ["id"],
  setup(props) {
    // composables
    const { document: playlist, error } = getDocument("playlists", props.id);
    const { updateDocument } = useDocument("playlists", props.id);
    const { user } = getUser();

    const isPending = ref(false);

    // computeds
    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      );
    });

    //handlers
    const handleClick = async (id) => {
      const songs = playlist.value.songs.filter((song) => song.id != id);

      await updateDocument({ songs });
    };

    return {
      error,
      playlist,
      user,
      ownership,
      handleClick,
      isPending,
    };
  },
  components: { AddSong, CoverImg, TextInfo },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
.edit {
  margin-right: 10px;
}
</style>
