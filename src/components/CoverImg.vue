<template>
  <div class="error">{{ fileError }}</div>
  <div class="cover">
    <button @click="handleClick" v-if="ownership">Upload new image</button>
    <input
      @change="handleChange"
      v-if="ownership"
      type="file"
      ref="input"
      style="display: none"
    />

    <div class="block-spinner" v-if="isPending">
      <SpinnerElem></SpinnerElem>
    </div>

    <img :src="playlist.coverUrl" />
  </div>
</template>

<script>
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import { ref } from "@vue/reactivity";
import SpinnerElem from "./SpinnerElem.vue";
export default {
  props: {
    playlist: {
      type: Object,
    },
    ownership: {},
    id: {},
  },
  setup(props) {
    // composables
    const { url, filePath, uploadImage, deleteImage } = useStorage();
    const { updateDocument } = useDocument("playlists", props.id);

    // refs
    const fileUpload = ref(null);
    const fileError = ref(null);
    const input = ref(null);
    const isPending = ref(false);

    // handlers
    const handleClick = () => {
      input.value.click();
    };

    // types images
    const types = ["image/png", "image/jpeg", "image/jpg"];

    const handleChange = async (e) => {
      const selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        fileUpload.value = selected;
        fileError.value = null;
        isPending.value = true;

        await deleteImage(props.playlist.filePath);
        await uploadImage(fileUpload.value);
        await updateDocument({ coverUrl: url.value, filePath: filePath.value });

        isPending.value = false;
      } else {
        fileUpload.value = null;
        fileError.value = "Please select an image file";
      }
    };
    return {
      handleClick,
      input,
      fileError,
      handleChange,
      isPending,
    };
  },
  components: { SpinnerElem },
};
</script>

<style scoped>
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  width: 380px;
  height: 320px;
}
.cover img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
button {
  position: absolute;
  left: 0;
  top: 0;
  margin: 20px;
}

.block-spinner {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
}
.block-spinner .spin {
  margin: 0;
}
</style>
