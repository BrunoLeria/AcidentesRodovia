<script setup lang="ts">
import { ref } from "vue";
import Form from "./NavigationDrawer/Form.vue"

const drawer = ref(true);
const rail = ref(true);

</script>
<template>
	<v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
		<v-list density="compact" nav>
			<v-list-item prepend-icon="mdi-magnify" title="Filtrar">
				<template v-slot:append>
					<v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
				</template>
			</v-list-item>
		</v-list>
		<v-divider></v-divider>
		<div v-show="!rail">
			<Form />
		</div>
	</v-navigation-drawer>
</template>