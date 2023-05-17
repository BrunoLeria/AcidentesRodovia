<script setup lang="ts">
import { ref } from "vue";
import { useOccurrenceStore } from "../../../../store/occurrences";
import { localRules, kmRules, requiredRules } from "../../../../utils/FormRules";
import { IOccurrence } from "../../../../interfaces/occurrence.interface";

const emit = defineEmits(['loading', 'dialog'])

const props = defineProps({
  occurrence: {
    type: Object as () => IOccurrence,
    required: false,
  },
});

const occurrencesStore = useOccurrenceStore();
const form = ref(false);
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

const local = ref("");
const occurrence_tipe = ref("");
const km = ref("");

if (props.occurrence) {
  local.value = props.occurrence.local;
  occurrence_tipe.value = props.occurrence.occurrence_tipe;
  km.value = props.occurrence.km.toString();
}

async function onSubmit() {
  if (form.value) {
    emit("loading", true);
    if (!props.occurrence)
      await occurrencesStore.addOccurrence(
        local.value,
        occurrence_tipe.value,
        parseInt(km.value),
      );
    else {
      if (props.occurrence.local != local.value || props.occurrence.occurrence_tipe != occurrence_tipe.value || props.occurrence.km != parseInt(km.value))
        await occurrencesStore.updateOccurrence(
          props.occurrence.id,
          local.value,
          occurrence_tipe.value,
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
            <v-select v-model="occurrence_tipe" :items="tiposAcidentes" :rules="requiredRules" label="Tipo do acidente:"
              required></v-select>
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