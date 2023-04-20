<template>
  <v-main>
    <router-view :key="route.fullPath" />
  </v-main>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
  //
</script>
