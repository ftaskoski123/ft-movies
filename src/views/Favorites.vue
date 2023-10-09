<template>
  <div>
    <button
      @click="$router.go(-1)"
      class="bg-red-500 px-4 py-2 text-sm font-medium absolute top-5 left-5 md:left-[2%] 2xl:left-[1%] rounded text-white hover:bg-red-700"
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
          <Movies
            :id="movie.id"
            :original_title="movie.title"
            :overview="movie.overview"
            :poster_path="movie.poster_path"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAuth } from "firebase/auth";
import axios from "axios";
import Movies from "@/components/Movies.vue";

const auth = getAuth();

const movies = ref<any[]>([]);



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
