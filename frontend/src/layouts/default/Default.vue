<template>
  <v-app>
    <div class="d-flex flex-row mb-6 bg-surface-variant">
      <default-bar v-model:drawer="drawer" />
      <div class="d-flex flex-col mb-6 bg-surface-variant">
        <default-view />
      </div>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import { ref } from 'vue';

const drawer = ref(false);
</script>
