<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/users";



const router = useRouter();
const userStore = useUserStore();

const form = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const showPassword = ref(false);
const rules = ref({
  required: (value: string) => !!value || "Requerido",
  min: (v: string) => v.length >= 8 || "Minímo 8 caracteres",
  emailValid: (v: string) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
  confirmPassword: (v: string) => v === password.value || "Senhas não conferem"
});

async function onSubmit() {
  if (!form) return;

  loading.value = true;

  await userStore.addUser(name.value, email.value, password.value).then(async (response) => {
    if (response) {
      const result = await userStore.login(email.value, password.value);
      loading.value = false;
      if (result) router.push({ path: "/" });
    }
  });
}
</script>

<template>
  <v-form v-model="form" @submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="name" :readonly="loading" :rules="[rules.required]" class="mb-2" clearable label="Nome"
            placeholder="Digite o seu nome"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="email" :readonly="loading" :rules="[rules.required, rules.emailValid]" class="mb-2"
            clearable label="E-mail" placeholder="Digite o seu e-mail"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]" :type="showPassword ? 'text' : 'password'" :readonly="loading" clearable
            label="Senha" placeholder="Digite a sua senha" @click:append="showPassword = !showPassword"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="confirmPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.confirmPassword]" :type="showPassword ? 'text' : 'password'"
            :readonly="loading" clearable label="Confirmar senha" placeholder="Confirme a sua senha"
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