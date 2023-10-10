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
          >
            Now Streaming
          </span>
          <h1
            class="text-white text-4xl font-extralight mb-2 md:text-5xl lg:text-6xl"
          >
            <span class="font-medium">Now</span> Streaming
          </h1>
          <button
            @click="scrollToMovies"
            href="#"
            class="text-xl self-start text-white bg-[#c92502] py-2 px-4 rounded"
          >
            View Movies
          </button>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { getAuth,signOut } from "firebase/auth";
import { useRouter } from "vue-router";
const auth = getAuth();

const router = useRouter();
const scrollToMovies = () => {
  const moviesElement = document.getElementById("movies");
  if (moviesElement) {
    moviesElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/login");
  });
};



</script>

<style >

.hero {
  @apply h-[400px] relative after:content-[''] after:absolute after:h-full after:w-full after:bg-[rgba(0,0,0,0.6)] after:left-0 after:top-0;
}
@media (min-width: 750px) {
  .hero {
    @apply h-[500px];
  }
}
</style>