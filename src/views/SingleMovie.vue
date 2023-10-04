<template>
  <div>
    <button
      @click="$router.go(-1)"
      class="bg-red-500 px-4 py-2 rounded text-white font-bold hover:bg-red-700"
    >
      Back
    </button>
    <div v-for="movie in movies" :key="movie.id">
      <div class="movie-info">
      <div class="movie-img">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt=""
        />
      </div>
      <div class="movie-content">
        <h1>Title: {{ movie.title }}</h1>
        <p class="movie-fact tagline">
          <span>Tagline:</span> "{{ movie.tagline }}"
        </p>
        <p class="movie-fact">
          <span>Released:</span>
          {{
            new Date(movie.release_date).toLocaleString('en-us', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </p>
        <p class="movie-fact">
          <span>Duration:</span> {{ movie.runtime }} minutes
        </p>
        <p class="movie-fact">
          <span>Revenue:</span>
          {{
            movie.revenue.toLocaleString('en-us', {
              style: 'currency',
              currency: 'USD',
            })
          }}
        </p>
        <p class="movie-fact"><span>Overview:</span> {{ movie.overview }}</p>
      </div>
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
