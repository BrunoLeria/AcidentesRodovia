<script setup lang="ts">
import Title from "@/components/Login/Title.vue";
import Form from "@/components/Login/Form.vue";
</script>

<template>
	<v-sheet class="pa-12 flex ma-12 bg-grey-darken-1" rounded>
		<v-card class="mx-auto px-6 py-8 bg-grey-darken-3">
			<Title />
			<Form />
		</v-card>
	</v-sheet>
</template>