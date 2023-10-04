<template>
  <div>
    <div class="hero">
      <img
        src="../assets/movieHero.jpg"
        alt=""
        class="w-full h-full object-cover"
      />
      <div
        class="z-[99] absolute w-full h-full flex flex-col justify-center m-0 top-0"
      >
        <button
          @click="handleSignOut"
          class="text-xl text-white bg-[#c92502] top-4 right-4 py-2 px-4 rounded absolute"
        >
          Sign Out
        </button>
        <div class="w-full max-w-[1400px] mx-auto my-0 px-4 py-0">
          <span
            class="font-semibold text-lg uppercase text-[#c92502] mb-2 md:text-[22px]"
            >Now Streaming</span
          >
          <h1
            class="text-white text-4xl font-extralight mb-2 md:text-5xl lg:text-6xl"
          >
            <span class="font-medium">Now</span> Streaming
          </h1>
          <button
            href="#"
            class="text-xl self-start text-white bg-[#c92502] py-2 px-4 rounded"
          >
            View Movies
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-[400px] mx-auto mb-6 px-4">
      <input
        @keyup="getsearchedMovies"
        type="text"
        placeholder="Search for movies..."
        v-model="searchQuery"
        class="w-[20%] absolute left-[15.5%] px-4 py-2 mt-10 border border-gray-300 rounded-md focus:outline-none focus:border-[#c92502]"
      />
    </div>

    <div class="grid mt-12 grid-cols-4 gap-8 px-60 py-20">
      <div
        v-if="searchQuery"
        v-for="movie in searchedMovies"
        :key="movie.id"
        class="relative group"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt=""
          class="w-full h-auto"
        />
      </div>
      <div
        v-else
        v-for="(movie, index) in movies"
        :key="movie.id || index"
        class="relative group"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt=""
          class="w-full h-auto"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref<boolean>(false);
const auth = getAuth();
const apiKey = "7b5d0f8cf0589dd9221f592daa43db40";
const movies = ref<any>([]);
const searchedMovies = ref<any>([]);
const searchQuery = ref<string>("");

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/login");
  });
};

const getMovies = async () => {
  const response = axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response;
  movies.value = data.data.results;
  console.log(movies.value);
};

const getsearchedMovies = async () => {
  const response = axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&query=${searchQuery.value}`
  );
  const data = await response;
  searchedMovies.value = data.data.results;

  console.log(searchedMovies.value);
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });

  getMovies();
});
</script>

<style scoped>
.hero {
  @apply h-[400px] relative after:content-[''] after:absolute after:h-full after:w-full after:bg-[rgba(0,0,0,0.6)] after:left-0 after:top-0;
}
@media (min-width: 750px) {
  .hero {
    @apply h-[500px];
  }
}
</style>
