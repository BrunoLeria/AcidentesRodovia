<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps({
  function: {
    type: Function,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: false,
    default: "elevated"
  },
})

const dialog = ref(false);
const loading = ref(false);

const onConfirm = async () => {
  loading.value = true;
  await props.function();
  loading.value = false;
  dialog.value = false;
}

</script>
<template>
  <v-btn :loading="loading" :variant="props.variant">
    <v-icon :icon="props.icon"></v-icon>
    <v-dialog v-model="dialog" activator="parent" width="1024">
      <v-card class="mx-auto px-6 py-8 bg-grey-darken-3">
        <v-card-text>
          {{ props.text }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" text @click="onConfirm">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>