<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/users";
import { ref } from "vue";
const router = useRouter();
const userStore = useUserStore();
const items = ref([
	{ title: "Login", function: router.push({ path: "/login" }), show: userStore.token === "" },
	{ title: "Register", function: router.push({ path: "/register" }), show: userStore.token === "" },
	{ title: "Logout", function: userStore.logout(), show: userStore.token !== "" },
	{ title: "About", function: router.push({ path: "/about" }), show: true }
]);
</script>

<template>
	<v-app-bar flat>
		<v-app-bar-title @click="router.push({ path: '/' })">
			<v-icon icon="mdi-road-variant"></v-icon>
			Acidentes de rodovia
		</v-app-bar-title>
		<v-spacer></v-spacer>
		<v-btn icon>
			<v-icon>mdi-dots-vertical</v-icon>
			<v-menu activator="parent">
				<v-list>
					<v-list-item v-for="(item, index) in items" :key="index" :value="index" v-show="item.show">
						<v-list-item-title @click="item.function">{{ item.title }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-btn>
	</v-app-bar>
</template>


