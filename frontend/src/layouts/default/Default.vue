<template>
	<v-app>
		<div class="d-flex flex-row mb-6 bg-grey-darken-3 h-100">
			<default-bar v-model:drawer="drawer" />
			<v-container>
				<DefaultView />
			</v-container>
		</div>
	</v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./AppBar.vue";
import { ref, defineAsyncComponent } from "vue";
import LoadingComponent from "@/components/Utils/Loading.vue";


const DefaultView = defineAsyncComponent({
	loader: () => import("./View.vue"),
	loadingComponent: LoadingComponent,
	// Delay before showing the loading component. Default: 200ms.
	delay: 200,
	// The error component will be displayed if a timeout is
	// provided and exceeded. Default: Infinity.
	timeout: 3000
});

const drawer = ref(false);
</script>
