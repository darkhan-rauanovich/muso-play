import { ref } from "vue";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
  error.value = null;
  isPending.value = true;

  const res = await createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      updateProfile(auth.currentUser, { displayName: displayName });
      error.value = null;
      isPending.value = false;

      return res;
    })
    .catch((err) => {
      console.log(err);
      error.value = err.message;
      isPending.value = false;
    });

  return res;
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
