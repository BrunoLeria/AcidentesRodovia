<script lang="ts" setup>
import { ref } from "vue";
defineProps(['drawer'])
defineEmits(['update:drawer'])
const items = ref([
  { title: 'Login' },
  { title: 'Register' },
  { title: 'About' },
  { title: 'Logout' },
])
</script>

<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-road-variant"></v-icon>
      Acidentes de rodovia
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
      <v-menu activator="parent">
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" :value="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </v-app-bar>
</template>


