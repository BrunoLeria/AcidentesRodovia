<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn icon="mdi-arrow-left-thin" @click="router.push({ name: 'Home' })"></v-btn>
      </v-col>
      <v-col>
        <h1 class="text-center mb-6">Registro</h1>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>