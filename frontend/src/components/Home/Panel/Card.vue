<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <v-card class="mx-auto" color="props.color" theme="dark" max-width="400" prepend-icon="mdi-twitter" title="props.title">
        <template v-slot:prepend>
            <v-icon size="x-large"></v-icon>
        </template>

        <v-card-subtitle class="text-h5 py-2">
            {{ props.name }}
        </v-card-subtitle>

        <v-card-text class="text-h5 py-2">
            {{ props.text }}
        </v-card-text>
    </v-card>
</template>