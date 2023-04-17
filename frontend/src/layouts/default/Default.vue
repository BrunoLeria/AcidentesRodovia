<template>
	<v-app>
		<div class="d-flex flex-row mb-6 bg-grey-darken-3 h-100">
			<default-bar v-model:drawer="drawer" />
			<v-container>
				<default-view />
			</v-container>
		</div>
	</v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import { ref } from "vue";

const drawer = ref(false);
</script>
