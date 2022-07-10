import { ref } from "vue";
import { addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { collection } from "firebase/firestore";

const useCollection = (CurrentCollection) => {
  const error = ref(null);
  const isPending = ref(false);

  const addDocument = async (doc) => {
    error.value = null;
    isPending.value = true;

    const res = await addDoc(collection(db, CurrentCollection), doc)
      .then((responseDoc) => {
        isPending.value = false;
        return responseDoc;
      })
      .catch((err) => {
        console.log(err);
        isPending.value = false;

        error.value = "Could not send the message";
      });

    return res;
  };

  return { addDocument, error, isPending };
};

export default useCollection;
