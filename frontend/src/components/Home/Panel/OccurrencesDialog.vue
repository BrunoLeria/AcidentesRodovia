<script setup lang="ts">
import { ref } from "vue";
import Form from "./OcurrencesDialog/Form.vue";
import Title from "./OcurrencesDialog/Title.vue";
import { IOccurrence } from "../../../interfaces/occurrence.interface";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: false,
    default: "elevated"
  },
  occurrence: {
    type: Object as () => IOccurrence,
    required: false,
  },
});

const dialog = ref(false);
const loading = ref(false);

</script>

<template>
  <v-btn :loading="loading" :variant="props.variant">
    <v-icon :icon="props.icon"></v-icon>
    <v-dialog v-model="dialog" activator="parent" width="1024">
      <v-card class="mx-auto px-6 py-8 bg-grey-darken-3">
        <Title :title="props.title" />
        <Form @dialog="(value: boolean) => dialog = value" :occurrence="occurrence" />
      </v-card>
    </v-dialog>
  </v-btn>
</template>