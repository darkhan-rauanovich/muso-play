<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="text" placeholder="email" required v-model="email" />
    <input type="password" placeholder="password" required v-model="password" />
    <div class="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, login, isPending } = useLogin();

    const email = ref("");
    const password = ref("");

    const router = useRouter();

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        router.push({ name: "user-playlists" });
      }
    };

    return { error, email, password, handleSubmit, isPending };
  },
};
</script>

<style></style>
