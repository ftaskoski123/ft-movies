<template>
  <div>
    <button
      @click="$router.go(-1)"
      class="bg-red-500 px-4 py-2 text-sm font-medium absolute top-20 left-60  rounded text-white  hover:bg-red-700"
    >
      Back
    </button>
    <div v-for="movie in movies" :key="movie.id" class="flex items-center space-x-4 mb-4">
      <div class="absolute top-40 left-60 flex items-center justify-center">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt=""
          class="h-[500px]"
        />
      </div>
      <div class="absolute top-40 left-[40%] space-y-2 text-left text-white">
        <h1 class="text-3xl font-semibold">Title: {{ movie.title }}</h1>
        <p class=" text-sm">
          <span class="font-semibold underline">Tagline:</span> "
          <span class="italic">{{ movie.tagline }}"</span>
        </p>
        <p class=" text-sm">
          <span class="font-semibold underline">Released:</span>
          {{
            new Date(movie.release_date).toLocaleString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </p>
        <p class=" text-sm">
          <span class="font-semibold underline">Duration:</span> {{ movie.runtime }} minutes
        </p>
        <p class=" text-sm">
          <span class="font-semibold underline">Revenue:</span>
          {{
            movie.revenue.toLocaleString('en-us', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </p>
        <p class=" text-sm">
          <span class="font-semibold underline">Overview:</span> {{ movie.overview }}
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
  console.log("movies", movies.value);
};
onMounted(() => {
  getSingleMovie();
});
</script>

