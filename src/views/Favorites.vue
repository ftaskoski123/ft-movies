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
          <!-- Display the movie poster -->
          <img
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            alt=""
            class="w-full h-auto lg:w-full xl:w-full"
            @mouseenter="showOverview(movie.id)"
            @mouseleave="hideOverview"
          />

     
          <p class="absolute md:bottom-0 bottom-0 left-0 py-2 px-3 text-white text-sm">
            <!-- Display the movie title -->
            {{ movie.title }}
          </p>
          <transition name="fade">
            <p
              v-if="showOverviewId === movie.id"
              class="absolute bottom-0 right-0 py-2 px-3 text-white text-sm bg-red-500"
              @mouseenter="showOverview(movie.id)"
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
    
    // Assuming the response contains an array of favorite movies
    movies.value = Object.values(response.data || {});
    console.log("faves", movies.value);
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

.hero {
  @apply h-[400px] relative after:content-[''] after:absolute after:h-full after:w-full after:bg-[rgba(0,0,0,0.6)] after:left-0 after:top-0;
}
@media (min-width: 750px) {
  .hero {
    @apply h-[500px];
  }
}
</style>
