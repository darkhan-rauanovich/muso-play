<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign Up</h3>
    <input type="text" placeholder="name" required v-model="name" />
    <input type="text" placeholder="email" required v-model="email" />
    <input type="password" placeholder="password" required v-model="password" />
    <div class="error">{{ error }}</div>
    <button v-if="!isPending">Sign Up</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, signup, isPending } = useSignup();

    const name = ref("");
    const email = ref("");
    const password = ref("");

    const router = useRouter();

    const handleSubmit = async () => {
      await signup(email.value, password.value, name.value);
      if (!error.value) {
        router.push({ name: "user-playlists" });
      }
    };

    return { error, isPending, name, email, password, handleSubmit };
  },
};
</script>

<style></style>
