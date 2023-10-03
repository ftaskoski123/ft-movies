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

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 800ms ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
