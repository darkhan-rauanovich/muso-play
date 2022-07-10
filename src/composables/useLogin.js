import { ref } from "vue";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
  error.value = null;
  isPending.value = true;

  const res = await signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      error.value = null;
      isPending.value = false;

      return res;
    })
    .catch((err) => {
      console.log(err);
      isPending.value = false;

      error.value = "incorrext login credentials";
    });

  return res;
};

const useLogin = () => {
  return { error, login, isPending };
};

export default useLogin;
