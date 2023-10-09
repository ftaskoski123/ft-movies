<template>
  <div>
    <div>
      <img
        src="../assets/movieHero.jpg"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>
    <div class="absolute inset-0 backdrop-blur-md">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Create an account
            </h1>
            <form
              @submit.prevent="register"
              class="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  type="email"
                  v-model="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  v-model="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p
                v-if="errorMsg"
                class="text-red-500 justify-center align-center flex"
              >
                {{ errorMsg }}
              </p>
              <p
                class="text-sm font-light text-gray-500 justify-center align-center flex dark:text-gray-400"
              >
                Already have an account?&nbsp;
                <a
                  href="#"
                  @click="redirectToLogin"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
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
};
</script>
