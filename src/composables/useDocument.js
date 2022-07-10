import { db } from "@/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref } from "vue";

const useDocument = (collectionDoc, id) => {
  let error = ref(null);
  let isPending = ref(false);

  const deleteDocument = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await deleteDoc(doc(db, collectionDoc, id));
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err);
      error.value = err.message;
      isPending.value = false;
    }
  };

  const updateDocument = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await updateDoc(doc(db, collectionDoc, id), updates);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err);
      error.value = err.message;
      isPending.value = false;
    }
  };

  return { error, isPending, deleteDocument, updateDocument };
};

export default useDocument;
