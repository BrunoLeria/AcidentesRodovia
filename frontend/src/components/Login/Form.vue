<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/users";
import { emailRules, passwordRules } from "@/utils/FormRules";

const router = useRouter();
const userStore = useUserStore();

const form = ref(false);
const email = ref("");
const password = ref("");
const loading = ref(false);
const showPassword = ref(false);

async function onSubmit() {
  if (!form) return;

  loading.value = true;

  const result = await userStore.login(email.value, password.value);
  loading.value = false;
  if (result) location.reload();
}
</script>

<template>
  <v-form v-model="form" @submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="emailRules"
            class="mb-2"
            clearable
            label="E-mail"
            placeholder="Digite o seu e-mail"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            :readonly="loading"
            clearable
            label="Senha"
            placeholder="Digite a sua senha"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <br />
    <v-container>
      <v-row align="center">
        <v-col>
          <v-btn
            :loading="loading"
            block
            color="blue-darken-4"
            size="large"
            type="button"
            @click="router.push({ name: 'Register' })"
            variant="elevated"
          >
            Register
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="green-darken-4"
            size="large"
            type="submit"
            variant="elevated"
          >
            Sign In
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
