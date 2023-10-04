<template>
    <div>
      <div v-for="(movie, index) in movies" :key="movie.id || index ">
        <img
          v-if="movie.backdrop_path"
          :src="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`"
          alt=""
          class="w-full h-auto"
        />
        <p class="flex justify-center">{{ movie.original_title }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const movies = ref<any>([]);
  const apiKey = "7b5d0f8cf0589dd9221f592daa43db40";
  
  const getSingleMovie = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${route.params.movieId}?api_key=${apiKey}&language=en-US`
    );
    const data = await response;
    console.log(data.data);
  };
  
  onMounted(() => {
    getSingleMovie();
  });
  </script>
  
  <style scoped>
  </style>
  