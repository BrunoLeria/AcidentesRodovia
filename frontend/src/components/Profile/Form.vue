<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/users";
import ConfirmPasswordDialog from "./ConfirmPasswordDialog.vue";
import { passwordRules, requiredRules } from "@/utils/FormRules";

const userStore = useUserStore();

const form = ref(false);
const name = ref(userStore.user.name);
const email = ref(userStore.user.email);
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const confirmPasswordRules = [
  (v: string) => v === password.value || "Password must match"
];

const updateUser = async () => {
  if (!form) return;

  const result = await userStore.updateUser(name.value, email.value, password.value);
  if (result) location.reload();
};

const deleteUser = async () => {
  if (!form) return;

  const result = await userStore.deleteUser();
  if (result) location.reload();
};

</script>

<template>
  <v-form v-model="form">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="name" :rules="requiredRules" class="mb-2" clearable label="Nome"
            placeholder="Digite o seu nome"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field disabled v-model="email" class="mb-2" clearable label="E-mail"
            placeholder="Digite o seu e-mail"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules[1]]" :type="showPassword ? 'text' : 'password'" clearable label="Senha"
            placeholder="Digite a sua senha" @click:append="showPassword = !showPassword"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="confirmPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="confirmPasswordRules" :type="showPassword ? 'text' : 'password'" clearable label="Confirmar senha"
            placeholder="Confirme a sua senha" @click:append="showPassword = !showPassword"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <br />
    <v-container>
      <confirm-password-dialog :email="userStore.user.email" :on-confirm="updateUser" :color="'green-darken-4'"
        :button-text="'Confirmar'" />
    </v-container>
    <br />
    <v-divider />
    <br />
    <v-container>
      <confirm-password-dialog :email="userStore.user.email" :on-confirm="deleteUser" :color="'red-darken-2'"
        :button-text="'Excluír perfil'" />
    </v-container>
  </v-form>
</template>