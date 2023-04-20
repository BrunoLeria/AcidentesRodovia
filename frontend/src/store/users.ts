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
    async updateUser(
      name: string,
      email: string,
      password: string
    ): Promise<boolean> {
      const myHeaders = new Headers();
      myHeaders.append(
        "x-token",
        localStorage.getItem("token") || "no token found"
      );
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: email === "" ? this.user.email : email,
        name: name === "" ? this.user.name : name,
        password: password,
      });

      const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(
        `http://localhost:5000/users/${this.user.id}`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          alert(result.message);
          return (
            result.hasOwnProperty("message") &&
            result.message === "Atualização do usuário realizada com sucesso"
          );
        });

      if (result)
        this.user = {
          id: this.user.id,
          name: name === "" ? this.user.name : name,
          email: email === "" ? this.user.email : email,
          password: "",
        };

      return result;
    },
    async deleteUser(): Promise<boolean> {
      const myHeaders = new Headers();
      myHeaders.append(
        "x-token",
        localStorage.getItem("token") || "no token found"
      );

      const requestOptions: RequestInit = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      const result = await fetch(
        `http://localhost:5000/users/${this.user.id}`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          alert(result.message);
          return (
            result.hasOwnProperty("message") &&
            result.message === "Usuário excluido com sucesso"
          );
        });

      if (result) {
        localStorage.setItem("token", "");
        this.user = {} as IUser;
      }

      return result;
    },
  },
  persist: true,
});
