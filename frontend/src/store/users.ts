import { IUser } from "@/interfaces/user.interface";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {} as IUser,
    };
  },
  getters: {},
  actions: {
    async login(email: string, password: string): Promise<boolean> {
      localStorage.setItem("token", "");
      this.$state.user = {} as IUser;

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
            localStorage.setItem("token", result.token);
            this.$state.user = result.user;
            return true;
          }
        });
      return result;
    },
    async addUser(
      name: string,
      email: string,
      password: string
    ): Promise<boolean> {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name: name,
        email: email,
        password: password,
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch("http://localhost:5000/users", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.hasOwnProperty("message")) {
            alert(result.message);
            return false;
          } else {
            this.user = result;
            return true;
          }
        });

      return result;
    },
    updateUser(id: number): void {},
    deleteUser(id: number): void {},
  },
  persist: true,
});
