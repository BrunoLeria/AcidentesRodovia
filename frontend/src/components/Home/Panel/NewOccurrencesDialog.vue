<script setup lang="ts">
import { ref } from "vue";
import Form from "./OcurrencesDialog/Form.vue";
import Title from "./OcurrencesDialog/Title.vue";

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

const dialog = ref(false);
const loading = ref(false);

</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-btn :loading="loading" :color="props.color" variant="elevated" icon="" density="default">
        <v-icon :icon="props.icon"></v-icon>
        <v-dialog v-model="dialog" activator="parent" width="1024">
          <v-card class="mx-auto px-6 py-8 bg-grey-darken-3">
            <Title :title="props.title" :sub-title="props.subTitle" />
            <Form @dialog="(value: boolean) => dialog = value" />
          </v-card>
        </v-dialog>
      </v-btn>
    </v-row>
  </v-container>
</template>