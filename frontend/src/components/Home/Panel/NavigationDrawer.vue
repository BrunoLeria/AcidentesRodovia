<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(true);
const items = ref(["California", "Colorado", "Florida", "Georgia", "Texas", "Wyoming"]);
const rail = ref(true);
const data = ref("");
const hora = ref("");
const local = ref("");
const tipo_incidente = ref("");
const km = ref("");
</script>
<template>
	<v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
		<v-list density="compact" nav>
			<v-list-item prepend-icon="mdi-magnify" title="Search">
				<template v-slot:append>
					<v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
				</template>
			</v-list-item>
		</v-list>
		<v-divider></v-divider>
		<div v-show="!rail">
			<v-label class="ma-5">Filtros</v-label>
			<v-divider></v-divider>
			<v-label class="mx-5 mt-5">Data:</v-label>
			<v-text-field variant="outlined" v-show="!rail" class="mx-5 mb-5" type="date"></v-text-field>
			<v-label class="mx-5">Hora:</v-label>
			<v-text-field variant="outlined" v-show="!rail" class="mx-5 mb-5" type="time" suffix="BRL"></v-text-field>
			<v-label class="mx-5">Local:</v-label>
			<v-text-field variant="outlined" v-show="!rail" class="mx-5 mb-5"></v-text-field>
			<v-label class="mx-5">Tipo do incidente:</v-label>
			<v-combobox :items="items" variant="outlined" v-show="!rail" class="mx-5 mb-5"></v-combobox>
			<v-label class="mx-5">KM:</v-label>
			<v-text-field variant="outlined" v-show="!rail" class="mx-5 mb-5"></v-text-field>
			<v-btn color="primary" class="mx-5 mb-5">Filtrar</v-btn>
		</div>
	</v-navigation-drawer>
</template>