import { auth } from "@/firebase";
import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";

const user = ref(auth.currentUser);

onAuthStateChanged(auth, (_user) => {
  // console.log("user state changed. Current user is:", _user);
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
