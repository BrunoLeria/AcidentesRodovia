<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "@/store/users";
import { IUser } from "@/interfaces/user.interface";

const router = useRouter();
const userStore = useUserStore();

const hasToken = localStorage.getItem("token") !== "";

const items = ref([
	{ title: "Login", link: "/login", show: !hasToken },
	{ title: "Register", link: "/register", show: !hasToken },
	{ title: "Profile", link: "/profile", show: hasToken },
	{ title: "About", link: "/about", show: true }
]);

const logout = () => {
	localStorage.setItem("token", "");
	userStore.user = {} as IUser;
	location.reload();
};
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
						<v-list-item-title @click="router.push({ path: item.link })">{{ item.title }}</v-list-item-title>
					</v-list-item>
					<v-list-item :key="4" :value="4" v-show="hasToken">
						<v-list-item-title @click="logout">Logout</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-btn>
	</v-app-bar>
</template>


