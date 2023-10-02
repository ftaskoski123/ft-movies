<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl font-bold mb-4">Register</h1>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
          >Email</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password"
          >Password</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click.prevent="register"
        >
          Register
        </button>
      </div>
    </form>
    <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
    <div class="mt-4">
      <p class="text-gray-700">Already have an account? Login now.</p>
      <button
        class="text-blue-500 hover:underline focus:outline-none"
        @click="redirectToLogin"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();

const email = ref<string>("");
const password = ref<string>("");
const errorMsg = ref<string>("");

const register = async () => {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("user created");
      router.push("/");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg.value = "Invalid email";
          break;
        case "auth/email-already-in-use":
          errorMsg.value = "Email is already in use. Please choose another.";
          break;
        case "auth/weak-password":
          errorMsg.value =
            "Password is too weak. Please choose a stronger password.";
          break;
        default:
          errorMsg.value =
            "An error occurred during registration. Please try again later.";
          break;
          
      }
    });
};

const redirectToLogin = () => {
  router.push("/login");
}
</script>
