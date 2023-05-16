<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/users";
import { emailRules, passwordRules, requiredRules } from "@/utils/FormRules";

const userStore = useUserStore();

const form = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const showPassword = ref(false);

const confirmPasswordRules = [
  (v: string) => v === password.value || "Password must match"
];

async function onSubmit() {
  if (!form) return;

  loading.value = true;

  await userStore.addUser(name.value, email.value, password.value).then(async (response) => {
    if (response) {
      const result = await userStore.login(email.value, password.value);
      loading.value = false;
      if (result) location.reload();
    }
  });
}
</script>

<template>
  <v-form v-model="form" @submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="name" :readonly="loading" :rules="requiredRules" class="mb-2" clearable label="Nome"
            placeholder="Digite o seu nome"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="email" :readonly="loading" :rules="emailRules" class="mb-2" clearable label="E-mail"
            placeholder="Digite o seu e-mail"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'" :readonly="loading" clearable label="Senha"
            placeholder="Digite a sua senha" @click:append="showPassword = !showPassword"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="confirmPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="confirmPasswordRules" :type="showPassword ? 'text' : 'password'" :readonly="loading" clearable
            label="Confirmar senha" placeholder="Confirme a sua senha"
            @click:append="showPassword = !showPassword"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <br />
    <v-container>
      <v-row align="center">
        <v-col>
          <v-btn :disabled="!form" :loading="loading" block color="green-darken-4" size="large" type="submit"
            variant="elevated">
            Confirmar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>