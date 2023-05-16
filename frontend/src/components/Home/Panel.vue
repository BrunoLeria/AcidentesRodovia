<script setup lang="ts">
import Card from "./Panel/Card.vue";
import NavigationDrawer from "@/components/Home/Panel/NavigationDrawer.vue";
import { useOccurrenceStore } from "@/store/occurrences";
import { getRandomIntInclusive } from "@/utils/NumbersTreatment";
import { onMounted } from "vue";
import OccurrencesDialog from "./Panel/OccurrencesDialog.vue";
import { colors } from "@/utils/Colors";

const occurrencesStore = useOccurrenceStore();
const hasToken = localStorage.getItem("token") !== "";


const getOccurrences = async () => {
	const myHeaders = new Headers();

	const requestOptions: RequestInit = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	await fetch(
		"http://localhost:5000/occurrences",
		requestOptions
	)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			if (!result.hasOwnProperty("message")) {
				occurrencesStore.occurrences = result;
			}
		});
};

onMounted(() => {
	getOccurrences();
});

</script>
<template>
	<div class="d-flex flex-row mb-6 bg-surface-variant">
		<NavigationDrawer />
		<v-container>
			<v-row>
				<v-col v-for="occurrence in occurrencesStore.occurrences" :key="occurrence.id" cols="6" sm="4">
					<Card :occurrence="occurrence" :color="colors[getRandomIntInclusive(0, colors.length - 1)]" />
				</v-col>
			</v-row>
		</v-container>
		<v-layout-item v-if="hasToken" position="bottom"
			style="bottom: 0px; z-index: 1004; transform: translateY(0%); position: fixed; height: 88px; left: 300px; width: calc((100% - 300px) - 256px);">
			<v-container>
				<v-row justify="center">
					<occurrences-dialog :icon="'mdi-plus'" title="Criar nova ocorrência" />
				</v-row>
			</v-container>
		</v-layout-item>
	</div>
</template>