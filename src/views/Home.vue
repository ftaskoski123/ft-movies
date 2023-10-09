<template>
  <div>
    <!-- Hero section -->
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

    <!-- Search input -->
    <div class="max-w-[400px] mx-auto md:absolute px-4 md:mb-20 md:mt-2">
  <div class="md:flex md:items-center mt-2 md:mt-0 md:justify-start">
    <input
      @keyup="getsearchedMovies"
      type="text"
      placeholder="Search for movies..."
      v-model="searchQuery"
      class="w-full md:w-[70%] px-4 py-2 md:py-2 md:ml-2 border text-white border-gray-800 rounded-md focus:outline-none focus:border-[#c92502] bg-[#3B3B3B] mb-2 md:mb-0"
    />

    <router-link to="/favorites" class="flex-shrink-0 w-auto text-lg text-white bg-[#c92502] py-2 px-4 rounded md:ml-2 mt-2 md:mt-0">
      View Favorites
    </router-link>
  </div>
</div>

    <!-- Movies section -->
    <div
      id="movies"
      class="grid mt-12 gap-4 px-4 py-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6"
    >
      <!-- Searched movies or Movies -->
      <div
        v-for="(movie, index) in searchQuery ? searchedMovies : movies"
        :key="movie.id || index"
        class="relative group flex flex-col"
      >
        <div class="relative">
          <img
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            alt=""
            class="w-full h-auto lg:w-full xl:w-full"
            @mouseenter="showOverview(movie.id)"
            @mouseleave="hideOverview"
          />
          <!-- Movie details and button -->
          <p
            class="absolute top-0 left-0 py-2 px-3 text-white text-sm rounded-br-lg bg-[#c92502]"
          >
            {{ movie.vote_average.toFixed(1) }}
          </p>
          <p
            class="absolute md:bottom-0 bottom-0 left-0 py-2 px-3 text-white text-sm"
          >
            {{ movie.original_title }}
          </p>
          <transition name="fade">
            <p
              v-if="showOverviewId === movie.id"
              class="absolute bottom-0 right-0 py-2 px-3 text-white text-sm bg-red-500"
              @mouseenter="showOverview(movie.id)"
              @mouseleave="hideOverview()"
            >
              {{ truncatedOverview(movie.overview) }}
            </p>
          </transition>
          <button
            @click="
              toggleFavorite(
                movie.id,
                movie.original_title,
                movie.overview,
                movie.poster_path
              )
            "
            class="absolute top-2 right-2 text-lg text-white py-1 px-2 rounded-full"
          >
            <svg
              :class="{
                'text-yellow-500 hover:text-white fill-current': isFavorite(
                  movie.id
                ),
                'text-white hover:text-yellow-500 fill-current': !isFavorite(
                  movie.id
                ),
              }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 transition-colors duration-300 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </button>
        </div>
        <div class="mt-4">
          <button
            @click="viewDetails(movie.id)"
            class="text-xl text-white hover:bg-[#c92502] rounded border border-[#c92502] py-2 px-4"
          >
            Get More Info
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref<boolean>(false);
const auth = getAuth();
const apiKey = "7b5d0f8cf0589dd9221f592daa43db40";
const movies = ref<any>([]);
const searchedMovies = ref<any>([]);
const searchQuery = ref<string>("");
const showOverviewId = ref<number | boolean>(false);

const userFavorites = ref<any[]>([]);


const user = auth.currentUser;

const isFavorite = (movieId: number) => {
  return userFavorites.value.includes(movieId);
};
const toggleFavorite = (
  movieId: number,
  title: string,
  overview: string,
  poster_path: string
) => {
  if (!user) {
    return;
  }

  const userId = auth.currentUser?.uid;
  const userFavoritesRef = `https://movies-3fd3e-default-rtdb.firebaseio.com/favorites/${userId}/${movieId}.json`;

  if (isFavorite(movieId)) {
    axios
      .delete(userFavoritesRef)
      .then(() => {
        userFavorites.value = userFavorites.value.filter(
          (id) => id !== movieId
        );
      })
      .catch((error) => {
      });
  } else {
    axios
      .put(userFavoritesRef, { title, overview, poster_path, movieId })
      .then(() => {
        userFavorites.value.push(movieId);
      })
      .catch((error) => {
      });
  }
};

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/login");
  });
};

const scrollToMovies = () => {
  const moviesElement = document.getElementById("movies");
  if (moviesElement) {
    moviesElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

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
const getMovies = async () => {
  const response = axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
  );
  const data = await response;
  movies.value = data.data.results;
  console.log(movies.value);
};

const getsearchedMovies = async () => {
  const response = axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&query=${searchQuery.value}`
  );
  const data = await response;
  searchedMovies.value = data.data.results;

  console.log(searchedMovies.value);
};

const viewDetails = (movieId: number) => {
  router.push(`/movies/${movieId}`);
};

const getFavorites = async () => {
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    const response = await axios.get(
      `https://movies-3fd3e-default-rtdb.firebaseio.com/favorites/${userId}.json`
    );
    userFavorites.value = response.data
      ? Object.keys(response.data).map(Number)
      : [];
    console.log("fave", userFavorites.value);
  }
};

onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });

  getFavorites();
  getMovies();
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
