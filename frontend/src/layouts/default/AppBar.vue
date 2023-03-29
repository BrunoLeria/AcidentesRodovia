<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const router = useRouter();
const items = ref([
	{ title: "Login", link: "/login", show: route.params.id !== "" },
	{ title: "Register", link: "/register", show: true },
	{ title: "About", link: "/about", show: true },
	{ title: "Logout", link: "/logout", show: route.params.id === "" }
]);
</script>

<template>
	<v-app-bar flat>
		<v-app-bar-title>
			<v-icon icon="mdi-road-variant"></v-icon>
			Acidentes de rodovia
		</v-app-bar-title>
		<v-spacer></v-spacer>
		<v-btn icon>
			<v-icon>mdi-dots-vertical</v-icon>
			<v-menu activator="parent">
				<v-list>
					<v-list-item v-for="(item, index) in items" :key="index" :value="index">
						<v-list-item-title @click="router.push({ path: item.link })" v-if="item.show">{{
							item.title
						}}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-btn>
	</v-app-bar>
</template>


