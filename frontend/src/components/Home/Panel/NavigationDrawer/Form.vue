<script setup lang="ts">
import { ref, watch } from "vue";
import { occurrenceType } from "../../../../utils/TypeOfOccurrences";
import { useOccurrenceStore } from "../../../../store/occurrences";
import { useUserStore } from "../../../../store/users";
import { getDate, getTime } from "@/utils/DateTimeTreatment";

const props = defineProps({
  rail: Boolean,
});

const occurrencesStore = useOccurrenceStore();
const usersStore = useUserStore();
const date = ref("");
const local = ref("");
const occurrence_type = ref("");
const km = ref("");
const isRichardsSubject = ref(false);
const userId = ref("");
const time = ref("");

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

watch(userId, async () => {
  if (userId.value === null) {
    userId.value = "";
  }
});
async function getOccurrences(cancelar = false) {
  if (isRichardsSubject.value && !cancelar) {
    if (usersStore.user === null) {
      alert("Você precisa estar logado para filtrar ocorrências!");
      return;
    } else {
      await occurrencesStore.getOccurrencesByUser(usersStore.user.id);
      return;
    }
  }
  const registered_at = date.value.length === 0 ? time.value : date.value + "T" + time.value;
  await occurrencesStore.getOccurrences(
    registered_at,
    local.value,
    occurrenceType.indexOf(occurrence_type.value) + 1,
    parseInt(km.value === "" ? "0" : km.value),
    parseInt(userId.value === "" ? "0" : userId.value),
    isRichardsSubject.value
  );
}

async function reset() {
  date.value = "";
  local.value = "";
  occurrence_type.value = "";
  km.value = "";
  userId.value = "";
  await getOccurrences(true);
}
</script>

<template>
  <v-form ref="form" @submit.prevent="getOccurrences()">
    <v-container>
      <v-switch v-model="isRichardsSubject" label="Projeto Cliente-Servidor" inset></v-switch>
    </v-container>
    <v-divider></v-divider>
    <v-container v-if="!props.rail && !isRichardsSubject">
      <v-label class="mx-5 mt-5">ID do usuário:</v-label>
      <v-text-field clearable v-model="userId" variant="outlined" class="mx-5 mb-2" />
      <v-label class="mx-5">Data do acidente:</v-label>
      <v-text-field clearable v-model="date" type="date" :max="getDate()" step="1" variant="outlined"
        class="mx-5 mb-2"></v-text-field>
      <v-label class="mx-5">Hora do acidente:</v-label>
      <v-text-field clearable v-model="time" type="time" :max="getTime()" suffix="BRT" variant="outlined"
        class="mx-5 mb-2"></v-text-field>
      <v-label class="mx-5">Local:</v-label>
      <v-text-field clearable v-model="local" variant="outlined" class="mx-5 mb-2" />
      <v-label class="mx-5">Tipo do incidente:</v-label>
      <v-combobox clearable v-model="occurrence_type" :items="occurrenceType" variant="outlined" class="mx-5 mb-2" />
      <v-label class="mx-5">KM:</v-label>
      <v-text-field clearable v-model="km" variant="outlined" class="mx-5 mb-2" />
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="4" class="px-0 ">
          <v-btn color="primary" type="submit" class="mx-5 mb-5">Filtrar</v-btn>
        </v-col>
        <v-col cols="8">
          <v-btn color="error" class="mx-5 mb-5" @click.prevent="reset">Cancelar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>