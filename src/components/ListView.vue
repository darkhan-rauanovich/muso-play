<template>
  <div v-for="(playlist, key) in playlists" :key="key">
    <router-link
      :to="{ name: 'playlist-details', params: { id: playlist.id } }"
    >
      <div class="single">
        <div class="thumbnail">
          <img :src="playlist.coverUrl" alt="" />
        </div>
        <div class="info">
          <h3>{{ playlist.title }}</h3>
          <p>Created by {{ playlist.userName }}</p>
        </div>
        <div class="song-number">
          <p>{{ playlist.songs.length }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["playlists"],
};
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.thumbnail {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.info {
  margin: 0 30px;
}
.song-number {
  margin-left: auto;
}
</style>
