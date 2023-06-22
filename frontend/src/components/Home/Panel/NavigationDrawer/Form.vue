<script setup lang="ts">
import { ref, watch } from "vue";
import { occurrenceType } from "../../../../utils/TypeOfOccurrences";
import { useOccurrenceStore } from "../../../../store/occurrences";
import { getDate, getTime } from "@/utils/DateTimeTreatment";

const props = defineProps({
  rail: Boolean,
});

const occurrencesStore = useOccurrenceStore();
const date = ref(getDate());
const local = ref("");
const occurrence_type = ref("");
const km = ref("");
const isRichardsSubject = ref(false);
const userid = ref("");
const time = ref("12:30");

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

watch(occurrence_type, async () => {
  if (occurrence_type.value === null) {
    occurrence_type.value = "";
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
    occurrenceType.indexOf(occurrence_type.value) + 1,
    parseInt(km.value),
  );
}

async function reset() {
  date.value = "";
  local.value = "";
  occurrence_type.value = "";
  km.value = "";
  await getOccurrences();
}
</script>

<template>
  <v-form ref="form" @submit.prevent="getOccurrences">
    <v-row>
      <v-col cols="3"><v-label class="ma-5">Filtros</v-label>
      </v-col>
      <v-col cols="9"><v-switch v-model="isRichardsSubject" label="Projeto Cliente-Servidor" inset></v-switch></v-col>
    </v-row>
    <v-divider></v-divider>
    <v-label v-if="!props.rail" class="mx-5 mt-5">ID do usuário:</v-label>
    <v-text-field v-if="!props.rail" clearable v-model="userid" variant="outlined" class="mx-5 mb-5" />
    <v-label v-if="!props.rail && !isRichardsSubject" class="mx-5">Data do acidente:</v-label>
    <v-text-field v-if="!props.rail && !isRichardsSubject" clearable v-model="date" type="date" :max="getDate()" step="1"
      variant="outlined" class="mx-5 mb-5"></v-text-field>
    <v-label v-if="!props.rail && !isRichardsSubject" class="mx-5">Hora do acidente:</v-label>
    <v-text-field v-if="!props.rail && !isRichardsSubject" clearable v-model="time" type="time"
      :max="date === getDate() ? getTime() : ''" suffix="BRT" variant="outlined" class="mx-5 mb-5"></v-text-field>
    <v-label v-if="!props.rail && !isRichardsSubject" class="mx-5">Local:</v-label>
    <v-text-field v-if="!props.rail && !isRichardsSubject" clearable v-model="local" variant="outlined"
      class="mx-5 mb-5" />
    <v-label v-if="!props.rail && !isRichardsSubject" class="mx-5">Tipo do incidente:</v-label>
    <v-combobox v-if="!props.rail && !isRichardsSubject" clearable v-model="occurrence_type" :items="occurrenceType"
      variant="outlined" class="mx-5 mb-5" />
    <v-label v-if="!props.rail && !isRichardsSubject" class="mx-5">KM:</v-label>
    <v-text-field v-if="!props.rail && !isRichardsSubject" clearable v-model="km" variant="outlined" class="mx-5 mb-5" />
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