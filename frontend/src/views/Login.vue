<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/users";

const router = useRouter();
const userStore = useUserStore();

const form = ref(false);
const email = ref("");
const password = ref("");
const loading = ref(false);
const showPassword = ref(false);
const rules = ref({
	required: (value: string) => !!value || "Required.",
	min: (v: string) => v.length >= 8 || "Minímo 8 caracteres",
	emailMatch: () => `The email and password you entered don't match`,
	emailValid: (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid"
});

async function onSubmit() {
	if (!form) return;

	loading.value = true;

	const result = await userStore.verifyUser(email.value, password.value);
	loading.value = false;


	if (result === undefined) {
		alert("Usuário não encontrado");
	} else {
		router.push({ path: `/${result.id}` });
	}

}
</script>

<template>
	<v-sheet class="pa-12 flex ma-12 bg-grey-darken-1" rounded>
		<v-card class="mx-auto px-6 py-8 bg-grey-darken-3">
			<v-container>
				<v-row>
					<v-col>
						<v-btn icon="mdi-arrow-left-thin" @click="router.push({ path: '/' })"></v-btn>
					</v-col>
					<v-col>
						<h1 class="text-center mb-6">Login</h1>
					</v-col>
					<v-col> </v-col>
				</v-row>
			</v-container>
			<v-form v-model="form" @submit.prevent="onSubmit">
				<v-container>
					<v-row>
						<v-col>
							<v-text-field v-model="email" :readonly="loading" :rules="[rules.required, rules.emailValid]" class="mb-2"
								clearable label="E-mail" placeholder="Digite o seu e-mail"></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
								:rules="[rules.required, rules.min]" :type="showPassword ? 'text' : 'password'" :readonly="loading"
								clearable label="Senha" placeholder="Digite a sua senha"
								@click:append="showPassword = !showPassword"></v-text-field>
						</v-col>
					</v-row>
				</v-container>
				<br />
				<v-container>
					<v-row align="center">
						<v-col>
							<v-btn :disabled="!form" :loading="loading" block color="blue-darken-4" size="large" type="button"
								@click="router.push({ path: '/register' })" variant="elevated">
								Register
							</v-btn>
						</v-col>
						<v-col>
							<v-btn :disabled="!form" :loading="loading" block color="green-darken-4" size="large" type="submit"
								variant="elevated">
								Sign In
							</v-btn>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
		</v-card>
	</v-sheet>
</template>