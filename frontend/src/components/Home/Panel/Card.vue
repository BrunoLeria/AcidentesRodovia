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
    <v-card :color="props.color" theme="dark" max-width="400" class="py-5 px-2">
        <v-card-title class="text-h6 py-5 flex flex-column justify-space-between">
            <v-row align-content="space-between">
                <v-col cols="7">
                    {{ props.occurrence.local }}
                </v-col>
                <v-col cols="2">
                    <v-btn variant="text">
                        <v-icon icon="mdi-pencil"></v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="3">
                    <v-btn variant="text">
                        <v-icon icon="mdi-delete"></v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-subtitle class="text-h6 py-2">
            Km: {{ props.occurrence.km }}
        </v-card-subtitle>
        <v-divider />

        <v-card-text class="text-h8 py-2">
            Registrado em: {{ props.occurrence.registered_at }}
            <br />
            Pelo usuário: {{ props.occurrence.user_id }}
            <br />
            Tipo de ocorrência: {{ props.occurrence.occurrence_tipe }}
        </v-card-text>
    </v-card>
</template>