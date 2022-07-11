<template>
  <div v-if="!editState">
    <h2>{{ playlist.title }}</h2>

    <p class="username">Created by {{ playlist.userName }}</p>

    <p class="description">{{ playlist.description }}</p>
  </div>
  <div v-else>
    <form @submit.prevent="handleSave">
      <label for="title-edit">Title</label>
      <input
        type="text"
        id="title-edit"
        placeholder="title..."
        required
        v-model="title"
      />
      <label for="description-edit">Description</label>
      <textarea
        id="description-edit"
        placeholder="desciption..."
        required
        v-model="description"
      ></textarea>
      <button v-if="!pendEdit">Save</button>
      <button v-else disabled>Saving...</button>
    </form>
  </div>

  <div v-if="ownership">
    <button class="edit" v-if="!editState" @click="editState = !editState">
      Edit
    </button>
    <button class="edit" v-else @click="editState = !editState">Cancel</button>

    <button class="danger" @click="handleDelete" v-if="!isPending">
      Delete Playlist
    </button>
    <button class="danger" v-if="isPending" disabled>Deleting</button>
  </div>
</template>

<script>
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";

import { onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  props: {
    playlist: {},
    ownership: {},
    id: {},
  },
  setup(props) {
    const { deleteDocument, updateDocument } = useDocument(
      "playlists",
      props.id
    );
    const { deleteImage } = useStorage();

    const router = useRouter();

    const isPending = ref(false);
    const editState = ref(false);
    const pendEdit = ref(false);

    const title = ref("");
    const description = ref("");

    onMounted(() => {
      title.value = props.playlist.title;
      description.value = props.playlist.description;
    });

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

    const handleSave = async () => {
      pendEdit.value = true;

      await updateDocument({
        title: title.value,
        description: description.value,
      });

      editState.value = false;
      pendEdit.value = false;
    };

    return {
      handleDelete,
      isPending,
      editState,
      handleSave,
      title,
      description,
      pendEdit,
    };
  },
};
</script>

<style scoped>
form {
  text-align: start;
  margin-top: 20px;
}
form textarea {
  resize: none;
  height: 140px;
}
</style>
