<template>
    <div class="relative group flex flex-col">
      <div class="relative">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${poster_path}`"
          alt=""
          class="w-full h-auto lg:w-full xl:w-full"
          @mouseenter="showOverview(id)"
          @mouseleave="hideOverview"
        />
        <!-- Movie details and button -->
        <p v-if="vote_average" class="absolute top-0 left-0 py-2 px-3 text-white text-sm rounded-br-lg bg-[#c92502]">
          {{ vote_average !== undefined ? vote_average.toFixed(1) : '' }}
        </p>
        <p class="absolute md:bottom-0 bottom-0 left-0 py-2 px-3 text-white text-sm">
          {{ original_title }}
        </p>
        <transition name="fade">
          <p
            v-if="showOverviewId === id"
            class="absolute bottom-0 right-0 py-2 px-3 text-white text-sm bg-red-500"
            @mouseenter="showOverview(id)"
            @mouseleave="hideOverview()"
          >
            {{ truncatedOverview(overview) }}
          </p>
        </transition>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  const props = defineProps<{
    id: number;
    poster_path: string;
    original_title?: string;
    overview?: string;
    vote_average?: number; 
  }>();
  
  const showOverviewId = ref<number | boolean>(false);
  
  const truncatedOverview = (overview: any) => {
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
  </script>
  