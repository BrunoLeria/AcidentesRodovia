<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useOccurrenceStore } from "@/store/occurrences";
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: "primary"
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
});

const tiposAcidentes = ref([
  "Colisão traseira",
  "Saída de pista",
  "Abalroamento lateral mesmo sentido",
  "Choque com objeto fixo",
  "Abalroamento transversal",
  "Atropelamento",
  "Abalroamento lateral sentido oposto",
  "Atropelamento de animal",
  "Capotagem",
  "Tombamento",
  "Colisão frontal",
  "Atropelamento e fuga",
  "Choque com veiculo estacionado",
  "Outros tipos"
]);
const occurrencesStore = useOccurrenceStore();

const dialog = ref(false);
const local = ref("");
const occurrence_tipe = ref("");
const km = ref("");
const loading = ref(false);

async function onSubmit() {
  loading.value = true;
  await occurrencesStore.addOccurrence(
    local.value,
    occurrence_tipe.value,
    parseInt(km.value),
  );
  loading.value = false;
  dialog.value = false;
}

</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-btn :loading="loading" :color="props.color" variant="elevated" icon="mdi-plus" density="default">
        <v-dialog v-model="dialog" activator="parent" width="1024">
          <v-card class="mx-auto px-6 py-8 bg-grey-darken-3">
            <v-card-title>
              <span class="text-h5">{{ props.title }}</span>
            </v-card-title>
            <v-card-subtitle>
              <span class="text-body-2">{{ props.subTitle }}</span>
            </v-card-subtitle>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Local:" hint="O local onde o acidente ocorreu." required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="KM:" hint="O quilometro que o acidente ocorreu" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select :items="tiposAcidentes" label="Tipo do acidente:" required></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="onSubmit">
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </v-row>
  </v-container>
</template>