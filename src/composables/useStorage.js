import { storage } from "@/firebase";
import {
  ref as refStore,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = refStore(storage, filePath.value);

    await uploadBytes(storageRef, file)
      .then(() => {
        error.value = null;
      })
      .catch((err) => {
        console.log(err);
        error.value = err.message;
      });

    await getDownloadURL(storageRef)
      .then((urlPath) => {
        url.value = urlPath;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteImage = async (path) => {
    const storageRef = refStore(storage, path);

    try {
      await deleteObject(storageRef);
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  };

  return { url, filePath, error, uploadImage, deleteImage };
};

export default useStorage;
