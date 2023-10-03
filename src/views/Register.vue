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
        <h1 class="text-4xl font-bold mb-6 text-center">Register</h1>
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
            @click.prevent="register"
            type="submit"
            class="rounded-3xl bg-blue-500 hover:bg-blue-700 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300"
          >
            Register
          </button>
        </div>
        <div class="mt-6">
          <p class="text-gray-700 text-lg">
            Already have an account? Login here
          </p>
          <button
            class="text-blue-500 hover:underline focus:outline-none text-lg"
            @click="redirectToLogin"
          >
            Login
          </button>
          <p v-if="errorMsg" class="text-red-500 justify-center align-center flex">{{ errorMsg }}</p>

        </div>
      </form>
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
