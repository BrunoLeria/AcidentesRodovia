<script setup lang="ts">
import Card from './Card.vue';
</script>
<template>
      <v-container>
        <v-row>
          <v-col
            v-for="n in 24"
            :key="n"
            cols="4"
          >
            <Card/>
          </v-col>
        </v-row>
      </v-container>
</template>