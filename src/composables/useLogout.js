import { ref } from "vue";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const logout = async () => {
  error.value = null;
  isPending.value = true;

  const res = await signOut(auth)
    .then((res) => {
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

const useLogout = () => {
  return { error, logout, isPending };
};

export default useLogout;
