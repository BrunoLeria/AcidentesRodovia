<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useUserStore } from "@/store/users";
const props = defineProps({
  email: {
    type: String,
    required: true
  },
  onConfirm: {
    type: Function,
    required: true
  },
  color: {
    type: String,
    required: false,
    default: "primary"
  },
  buttonText: {
    type: String,
    required: false,
    default: "Open Dialog"
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
});

const userStore = useUserStore();
const dialog = ref(false);
const password = ref("");
const loading = ref(false);

async function onSubmit() {
  const result = await userStore.login(props.email, password.value);
  if (result)
    props.onConfirm();
  else (password.value = "")
}
</script>

<template>
  <v-row justify="center">
    <v-btn :disabled="props.disabled" :loading="loading" block :color="props.color" size="large" variant="elevated">
      {{ props.buttonText }}
      <v-dialog v-model="dialog" activator="parent" width="1024">
        <v-card class="mx-auto px-6 py-8 bg-grey-darken-3">
          <v-card-title>
            <span class="text-h5">Confirmar senha</span>
          </v-card-title>
          <v-card-subtitle>
            <span class="text-body-2">Para confirmar a operação, digite sua senha</span>
          </v-card-subtitle>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
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
</template>