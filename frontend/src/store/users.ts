import { IUser } from "@/interfaces/user.interface";
import { defineStore } from "pinia";
import { url } from "@/utils/HttpRequestInfo";
import { Md5 } from "ts-md5";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {} as IUser,
    };
  },
  getters: {},
  actions: {
    async login(email: string, password: string): Promise<boolean> {
      const raw = JSON.stringify({
        email: email,
        password: Md5.hashStr(password),
      });

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(url + "/login", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.hasOwnProperty("message")) {
            alert(result.message);
            return false;
          } else {
            localStorage.setItem("token", result.token);
            this.$state.user = {
              id: result.id,
              name: result.name,
              email: result.email,
              password: "",
            };
            return true;
          }
        });
      return result;
    },

    async logout(): Promise<boolean> {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token") || "no token found"
      );
      myHeaders.append("Cookie", "Authentication=");

      const raw = JSON.stringify({
        id: this.user.id,
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(url + "/logout", requestOptions)
        .then((response) => console.log(response))
        .then((result) => console.log(result))
        .catch((error) => console.log(error));

      localStorage.setItem("token", "");
      this.$state.user = {} as IUser;
      return true;
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
        password: Md5.hashStr(password),
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(url + "/users", requestOptions)
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
        "Authorization",
        "Bearer " + localStorage.getItem("token") || "no token found"
      );
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: email === "" ? this.user.email : email,
        name: name === "" ? this.user.name : name,
        password: password === "" ? null : password,
      });

      const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(
        url + `/users/${this.user.id}`,
        requestOptions
      ).then((response) => {
        return response.json();
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
        "Authorization",
        "Bearer " + localStorage.getItem("token") || "no token found"
      );

      const requestOptions: RequestInit = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      const result = await fetch(url + `/users/${this.user.id}`, requestOptions)
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
