<template>
    <div>
      <button
        @click="viewDetails(movie.id)"
        class="text-xl text-white hover:bg-[#c92502] rounded border border-[#c92502] py-2 px-4"
      >
        Get More Info
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
    import {useRouter} from "vue-router";
    const router = useRouter();

  
  const props = defineProps({
    movie: {
      type: Object,
      required: true,
    },
  });
  
  const viewDetails = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };
  </script>
  
  <style scoped>
  </style>
  