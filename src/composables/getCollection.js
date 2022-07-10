import { db } from "@/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ref, watchEffect } from "vue";

const getCollection = (collectionDoc, queryArg) => {
  const documents = ref(null);
  const error = ref(null);

  // register the firestore collection reference
  let collectionRef = collection(db, collectionDoc);

  // create query
  let _query = query(collectionRef, orderBy("createdAt", "desc"));

  if (queryArg) {
    _query = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      where(...queryArg)
    );
  }

  const unsubscribe = onSnapshot(
    _query,
    (querySnapshot) => {
      let results = [];
      querySnapshot.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      // update values
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err);
      documents.value = null;
      error.value = "could not fetch data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      unsubscribe();
    });
  });

  return { documents, error };
};

export default getCollection;
