<template>
   <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in"> 
    <component :is="Component" />
  </Transition>
    </RouterView>


</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 800ms ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

body {
  background-color: #191b1c;
}
</style>
