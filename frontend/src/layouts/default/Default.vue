<template>
  <v-app>
    <default-bar v-model:drawer="drawer"/>
    <navigation-drawer :drawer="drawer"></navigation-drawer>
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
  import NavigationDrawer from '@/components/NavigationDrawer.vue';
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import {ref} from 'vue';

  const drawer = ref(false);
</script>
