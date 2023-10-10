<template>
  <div>
    <button
      @click="$router.go(-1)"
      class="bg-red-500 px-4 py-2 text-sm 2k:left-[25%] font-medium absolute top-5 left-5 md:top-[6%] md:left-[5%] 2xl:left-[15%] 2xl:top-[9%] rounded text-white hover:bg-red-700"
    >
    Go back
    </button>
    <div
      v-for="movie in movies"
      :key="movie.id"
      class="flex flex-col md:flex-row items-center space-x-4 mb-4"
    >
      <div
        class="md:absolute top-10 2xl:top-[15%] md:top-[10%] 2k:left-[25%] left-5 2xl:left-[15%] md:left-[5%] w-full md:w-auto flex items-center justify-center"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt=""
          class="w-full md:w-auto h-auto"
        />
      </div>
      <div
        class="md:absolute top-40 left-5 space-y-2 text-left 2k:left-[45%] lg:left-[60%] md:left-[70%] text-white xl:top-[25%] xl:left-[50%]"
      >
        <h1 class="text-3xl font-semibold">Title: {{ movie.title }}</h1>
        <p class="text-sm">
          <span class="font-semibold underline">Tagline:</span> "
          <span class="italic">{{ movie.tagline }}"</span>
        </p>
        <p class="text-sm">
          <span class="font-semibold underline">Released:</span>
          {{
            new Date(movie.release_date).toLocaleString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          }}
        </p>
        <p class="text-sm">
          <span class="font-semibold underline">Duration:</span>
          {{ movie.runtime }} minutes
        </p>
        <p class="text-sm">
          <span class="font-semibold underline">Revenue:</span>
          {{
            movie.revenue.toLocaleString("en-us", {
              style: "currency",
              currency: "USD",
            })
          }}
        </p>
        <p class="text-sm md:w-full">
          <span class="font-semibold underline">Overview:</span>
          {{ movie.overview }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const movies = ref<any[]>([]);

const apiKey = "7b5d0f8cf0589dd9221f592daa43db40";

const getSingleMovie = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${route.params.movieId}?api_key=${apiKey}&language=en-US`
  );
  const data = await response;
  movies.value = [data.data];
};
onMounted(() => {
  getSingleMovie();
});
</script>
