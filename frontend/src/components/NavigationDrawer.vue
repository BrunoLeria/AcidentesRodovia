<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true);
const items = ref([
  { title: 'Home', icon: 'mdi-home-city' },
  { title: 'My Account', icon: 'mdi-account' },
  { title: 'Users', icon: 'mdi-account-group-outline' },
]);
const rail = ref(true);
</script>
<template>
  <v-card class="rounded-0">
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-magnify" title="Search">
            <template v-slot:append>
              <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
            </template>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home">
          </v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account">
          </v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users">
          </v-list-item>
        </v-list>
        <v-text-field label="Label" variant="outlined"></v-text-field>

      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>