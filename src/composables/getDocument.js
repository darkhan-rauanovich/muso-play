import { db } from "@/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { ref, watchEffect } from "vue";

const getDocument = (collectionDoc, id) => {
  const document = ref(null);
  const error = ref(null);

  // register the firestore collection reference
  let documentRef = doc(db, collectionDoc, id);

  const unsubscribe = onSnapshot(
    documentRef,
    (doc) => {
      // update values
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = "that document does not exist";
      }
    },
    (err) => {
      console.log(err);
      error.value = "could not fetch data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      unsubscribe();
    });
  });

  return { document, error };
};

export default getDocument;
