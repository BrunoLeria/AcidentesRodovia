<script setup lang="ts">
import Card from "./Panel/Card.vue";
import NavigationDrawer from "@/components/Home/Panel/NavigationDrawer.vue";
</script>
<template>
	<div class="d-flex flex-row mb-6 bg-surface-variant">
		<NavigationDrawer />
		<v-container>
			<v-row>
				<v-col v-for="n in 24" :key="n" cols="6" sm="4">
					<!-- <Card /> -->
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>