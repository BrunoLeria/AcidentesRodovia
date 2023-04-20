import { IUser } from "@/interfaces/user.interface";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {} as IUser,
      token: "",
    };
  },
  getters: {},
  actions: {
    async login(email: string, password: string): Promise<boolean> {
      const raw = JSON.stringify({
        email: email,
        password: password,
      });

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch("http://localhost:5000/login", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.hasOwnProperty("message")) {
            alert(result.message);
            return false;
          } else {
            this.user = result.user;
            this.token = result.token;
            return true;
          }
        });
      return result;
    },
    async validateUserToken(): Promise<boolean> {
      const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
      };
      const result = await fetch(
        `http://localhost:5000/validate/?token=${this.$state.token}`,
        requestOptions
      ).then((response) => {
        if (response.status === 200) return true;
        else return false;
      });
      return result;
    },
    addUser(email: string, password: string): void {},
    updateUser(id: number): void {},
    deleteUser(id: number): void {},
  },
});
