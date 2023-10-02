<template>
  <div
    :style="{
      backgroundImage:
        'url(\'https://raw.githubusercontent.com/johnkomarnicki/movies-app-nuxtjs/master/movieapp/assets/imgs/movieHero.jpg\')',
    }"
    class="bg-cover bg-fixed bg-no-repeat min-h-screen"
  ></div>
  <div class="absolute inset-0 backdrop-blur-md">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <form class="bg-white shadow-2xl rounded p-8 mb-4">
        <h1 class="text-4xl font-bold mb-6 text-center">Login</h1>
        <div class="mb-6">
          <label class="block text-gray-700 text-lg font-bold mb-2" for="email"
            >Email</label
          >
          <input
            class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
            type="text"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-lg font-bold mb-2"
            for="password"
            >Password</label
          >
          <input
            class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>

        <div class="mt-8 flex justify-center text-lg text-black">
          <button
            @click.prevent="login"
            type="submit"
            class="rounded-3xl bg-blue-500 hover:bg-blue-700 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300"
          >
            Login
          </button>
        </div>
        <div class="mt-6">
          <p class="text-gray-700 text-lg">
            Don't have an account? Register now.
          </p>
          <button
            class="text-blue-500 hover:underline focus:outline-none text-lg"
            @click="redirectToRegister"
          >
            Register
          </button>
          <p v-if="errorMsg" class="text-red-500 justify-center align-center flex">{{ errorMsg }}</p>

        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();

const email = ref<string>("");
const password = ref<string>("");
const errorMsg = ref<string>("");

const redirectToRegister = () => {
  router.push("/register"); // Redirect to the registration page
};

const login = async () => {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("user loged");
      router.push("/");
    })
    .catch((error) => {
      console.log("error", error.code);

      switch (error.code) {
        case "auth/invalid-email":
          errorMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errorMsg.value = "User not found";
          break;
        case "auth/wrong-password":
          errorMsg.value = "Wrong password";
          break;
        default:
          errorMsg.value = `Email or password is incorrect`;
          break;
      }
    });
};
</script>
