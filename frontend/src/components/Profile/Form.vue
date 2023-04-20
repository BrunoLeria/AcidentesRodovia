<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/users";
import ConfirmPasswordDialog from "../Utils/ConfirmPasswordDialog.vue";

const userStore = useUserStore();

const form = ref(false);
const name = ref(userStore.user.name);
const email = ref(userStore.user.email);
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const rules = ref({
  required: (value: string) => !!value || "Requerido",
  min: (v: string) => v.length >= 8 || "Minímo 8 caracteres",
  emailValid: (v: string) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
  confirmPassword: (v: string) => v === password.value || "Senhas não conferem"
});
</script>

<template>
  <v-form v-model="form">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="name" :rules="[rules.required]" class="mb-2" clearable label="Nome"
            placeholder="Digite o seu nome"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field disabled v-model="email" :rules="[rules.required, rules.emailValid]" class="mb-2" clearable
            label="E-mail" placeholder="Digite o seu e-mail"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.min]"
            :type="showPassword ? 'text' : 'password'" clearable label="Senha" placeholder="Digite a sua senha"
            @click:append="showPassword = !showPassword"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="confirmPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.confirmPassword]" :type="showPassword ? 'text' : 'password'" clearable label="Confirmar senha"
            placeholder="Confirme a sua senha" @click:append="showPassword = !showPassword"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <br />
    <v-container>
      <confirm-password-dialog :disabled="!form" :email="userStore.user.email" :on-confirm="userStore.updateUser"
        :color="'green-darken-4'" :button-text="'Confirmar'" />
    </v-container>
    <br />
    <v-divider />
    <br />
    <v-container>
      <confirm-password-dialog :email="userStore.user.email" :on-confirm="userStore.deleteUser" :color="'red-darken-2'"
        :button-text="'Excluír perfil'" />
    </v-container>
  </v-form>
</template>