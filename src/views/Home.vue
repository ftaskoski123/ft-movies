
<template>
  <main>
    <p>Main</p>
    <button v-if="isLoggedIn" @click="handleSignOut" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Out</button>
</main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref<boolean>(false);
const auth = getAuth();

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/login");
  });
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
});

</script>
