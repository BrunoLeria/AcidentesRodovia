<script setup lang="ts">
import { IOccurrence } from "@/interfaces/occurrence.interface";
import OccurrencesDialog from './OccurrencesDialog.vue';
import ConfirmDialog from "./ConfirmDialog.vue";
import { useOccurrenceStore } from "@/store/occurrences";
import { useUserStore } from "@/store/users";
import { ref } from 'vue';
import { isoToBrazilianDate } from "@/utils/DateTimeTreatment";
import { occurrenceType } from '../../../utils/TypeOfOccurrences';

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
const ocorrenceStore = useOccurrenceStore();
const userStore = useUserStore();
const showOptions = ref(userStore.user.id == props.occurrence.user_id);

const deleteOccurrence = async () => {
    await ocorrenceStore.deleteOccurrence(props.occurrence.id);
}

</script>

<template>
    <v-card :color="props.color" theme="dark" max-width="400" class="py-5 px-2">
        <v-card-title class="text-h6 py-5 flex flex-column justify-space-between">
            <v-container class="d-none d-sm-none d-md-none d-lg-flex">
                <v-row align-content="space-between">
                    <v-col cols="7">
                        {{ props.occurrence.local }}
                    </v-col>
                    <v-col cols="2" v-show="showOptions">
                        <occurrences-dialog :occurrence="props.occurrence" variant="text" icon="mdi-pencil"
                            title="Editar sua ocorrência" />
                    </v-col>
                    <v-col cols="3" v-show="showOptions">
                        <confirm-dialog :function="deleteOccurrence" text="Deseja excluir a ocorrência?" icon="mdi-delete"
                            variant="text" />
                    </v-col>
                </v-row>
            </v-container>
            <v-container class="d-lg-none">
                <v-row align-content="space-between">
                    <v-col>
                        {{ props.occurrence.local }}
                    </v-col>
                </v-row>
                <v-row align-content="space-between">
                    <v-col cols="6" v-show="showOptions">
                        <occurrences-dialog :occurrence="props.occurrence" variant="text" icon="mdi-pencil"
                            title="Editar sua ocorrência" />
                    </v-col>
                    <v-col cols="6" v-show="showOptions">
                        <confirm-dialog :function="deleteOccurrence" text="Deseja excluir a ocorrência?" icon="mdi-delete"
                            variant="text" />
                    </v-col>
                </v-row>
            </v-container>
        </v-card-title>
        <v-card-subtitle class="text-h6 py-2">
            Km: {{ props.occurrence.km }}
        </v-card-subtitle>
        <v-divider />

        <v-card-text class="text-h8 py-2">
            Registrado em: {{ isoToBrazilianDate(props.occurrence.registered_at) }}
            <br />
            Pelo usuário: {{ props.occurrence.user_id }}
            <br />
            Tipo de ocorrência: {{ occurrenceType[props.occurrence.occurrence_type - 1] }}
        </v-card-text>
    </v-card>
</template>