<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <v-card-title>
    <span class="text-h5">{{ props.title }}</span>
  </v-card-title>
  <v-card-subtitle>
    <span class="text-body-2">{{ props.subTitle }}</span>
  </v-card-subtitle>
</template>