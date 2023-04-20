<script setup lang="ts">
import { defineProps } from 'vue';
import { IOccurrence } from "@/interfaces/occurrence.interface";

const props = defineProps({
    occurrence: {
        type: Object as () => IOccurrence,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <v-card class="mx-auto" :color="props.color" theme="dark" max-width="400" prepend-icon="m🔽 "
        :title="props.occurrence.local">

        <v-card-subtitle class="text-h6 py-2">
            Km: {{ props.occurrence.km }}
        </v-card-subtitle>
        <v-divider />

        <v-card-text class="text-h8 py-2">
            Registrado em: {{ props.occurrence.registered_at }}
            Pelo usuário: {{ props.occurrence.user_id }}
            Tipo de ocorrência: {{ props.occurrence.occurrence_tipe }}
        </v-card-text>
    </v-card>
</template>