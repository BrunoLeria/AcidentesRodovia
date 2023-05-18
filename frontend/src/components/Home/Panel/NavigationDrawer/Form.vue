<script setup lang="ts">
import { ref, watch } from "vue";
import { occurrenceType } from "../../../../utils/TypeOfOccurrences";
import { useOccurrenceStore } from "../../../../store/occurrences";

const props = defineProps({
  rail: Boolean,
});

const occurrencesStore = useOccurrenceStore();
const date = ref("");
const local = ref("");
const occurrence_tipe = ref("");
const km = ref("");

watch(date, async () => {
  if (date.value === null) {
    date.value = "";
  }
});

watch(local, async () => {
  if (local.value === null) {
    local.value = "";
  }
});

watch(occurrence_tipe, async () => {
  if (occurrence_tipe.value === null) {
    occurrence_tipe.value = "";
  }
});

watch(km, async () => {
  if (km.value === null) {
    km.value = "";
  }
});
async function getOccurrences() {
  await occurrencesStore.getOccurrences(
    date.value,
    local.value,
    occurrence_tipe.value,
    km.value,
  );
}

async function reset() {
  date.value = "";
  local.value = "";
  occurrence_tipe.value = "";
  km.value = "";
  await getOccurrences();
}
</script>

<template>
  <v-form ref="form" @submit.prevent="getOccurrences">
    <v-label class="ma-5">Filtros</v-label>
    <v-divider></v-divider>
    <v-label class="mx-5 mt-5">Data:</v-label>
    <v-text-field clearable v-model="date" variant="outlined" v-show="!props.rail" class="mx-5 mb-5"
      type="date"></v-text-field>
    <v-label class="mx-5">Local:</v-label>
    <v-text-field clearable v-model="local" variant="outlined" v-show="!props.rail" class="mx-5 mb-5" />
    <v-label class="mx-5">Tipo do incidente:</v-label>
    <v-combobox clearable v-model="occurrence_tipe" :items="occurrenceType" variant="outlined" v-show="!props.rail"
      class="mx-5 mb-5" />
    <v-label class="mx-5">KM:</v-label>
    <v-text-field clearable v-model="km" variant="outlined" v-show="!props.rail" class="mx-5 mb-5" />
    <v-container>
      <v-row>
        <v-col cols="4" class="px-0 ">
          <v-btn color="primary" type="submit" class="mx-5 mb-5">Filtrar</v-btn>
        </v-col>
        <v-col cols="8">
          <v-btn color="error" class="mx-5 mb-5" @click="reset">Cancelar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>