<script setup lang="ts">
import { ref } from "vue";
import { useOccurrenceStore } from "../../../../store/occurrences";
import { localRules, kmRules, requiredRules } from "../../../../utils/FormRules";
import { IOccurrence } from "../../../../interfaces/occurrence.interface";
import { occurrenceType } from "../../../../utils/TypeOfOccurrences";
import { getDate, getTime } from "@/utils/DateTimeTreatment";

const emit = defineEmits(['loading', 'dialog'])

const props = defineProps({
  occurrence: {
    type: Object as () => IOccurrence,
    required: false,
  },
});

const occurrencesStore = useOccurrenceStore();
const form = ref(false);
const local = ref("");
const occurrence_type = ref("");
const km = ref("");
const date = ref(getDate());
const time = ref(getTime());

if (props.occurrence) {
  local.value = props.occurrence.local;
  occurrence_type.value = occurrenceType[props.occurrence.occurrence_type + 1];
  km.value = props.occurrence.km.toString();
  date.value = getDate(props.occurrence.registered_at);
  time.value = getTime(props.occurrence.registered_at);
}

async function onSubmit() {
  if (form.value) {
    const registered_at = `${date.value}T${time.value}:00.000Z`
    emit("loading", true);
    if (!props.occurrence)
      await occurrencesStore.addOccurrence(
        registered_at,
        local.value,
        occurrenceType.indexOf(occurrence_type.value) + 1,
        parseInt(km.value),
      );
    else {
      if (props.occurrence.local !== local.value || occurrenceType[props.occurrence.occurrence_type + 1] !== occurrence_type.value || props.occurrence.km !== parseInt(km.value) || props.occurrence.registered_at !== registered_at)
        await occurrencesStore.updateOccurrence(
          props.occurrence.id,
          registered_at,
          local.value,
          occurrenceType.indexOf(occurrence_type.value) + 1,
          parseInt(km.value),
        );
      else {
        alert("Nenhuma alteração foi feita!");
      }
    }
    emit("loading", false);
    emit("dialog", false);
  }
}
</script>

<template>
  <v-container>
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="local" :rules="localRules" label="Local:" hint="O local onde o acidente ocorreu."
              required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="km" :rules="kmRules" label="KM:" hint="O quilometro que o acidente ocorreu"
              required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-select v-model="occurrence_type" :items="occurrenceType" :rules="requiredRules" label="Tipo do acidente:"
              required></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="date" label="Data do acidente:" type="date" :max="getDate()" step="1"
              required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="time" label="Hora do acidente:" type="time" :max="date === getDate() ? getTime() : ''"
              suffix="BRT" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red-darken-1" variant="text" @click="$emit('dialog', false)" type="button">
          Cancelar
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" type="submit">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-container>
</template>