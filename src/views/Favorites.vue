<template>
  <div>
    <button
      @click="$router.go(-1)"
      class="bg-red-500 px-4 py-2 text-sm 2k:left-[25%] font-medium absolute top-5 left-5 md:left-[2%] 2xl:left-[1%] rounded text-white hover:bg-red-700"
    >
      Go back
    </button>
    <div
      id="movies"
      class="grid mt-12 gap-4 px-4 py-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6"
    >
      <div
        v-for="(movie, index) in movies"
        :key="movie.id || index"
        class="relative group flex flex-col"
      >
        <div class="relative">
          <img
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            alt=""
            class="w-full h-auto lg:w-full xl:w-full"
            @mouseenter="showOverview(movie.movieId)"
            @mouseleave="hideOverview"
          />

     
          <p class="absolute md:bottom-0 bottom-0 left-0 py-2 px-3 text-white text-sm">
            <!-- Display the movie title -->
            {{ movie.title }}
          </p>
          <transition name="fade">
            <p
              v-if="showOverviewId === movie.movieId"
              class="absolute bottom-0 right-0 py-2 px-3 text-white text-sm bg-red-500"
              @mouseenter="showOverview(movie.movieId)"
              @mouseleave="hideOverview()"
            >
              <!-- Display the movie overview -->
              {{ truncatedOverview(movie.overview) }}
            </p>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAuth,} from "firebase/auth";

import axios from "axios";
const auth = getAuth();

const movies = ref<any>([]);
const showOverviewId = ref<number | boolean>(false);

const truncatedOverview = (overview: string) => {
  const maxLength = 180;
  if (overview.length <= maxLength) {
    return overview;
  } else {
    return `${overview.substring(0, maxLength)} ...`;
  }
};

const showOverview = (movieId: number) => {
  showOverviewId.value = movieId;
};

const hideOverview = () => {
  showOverviewId.value = false;
};
const getFavorites = async () => {
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    const response = await axios.get(
      `https://movies-3fd3e-default-rtdb.firebaseio.com/favorites/${userId}.json`
    );
    
    movies.value = Object.values(response.data || {});
  }
};
onMounted(async () => {
  getFavorites();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
