import { defineStore } from "pinia";
import { IOccurrence } from "@/interfaces/occurrence.interface";
import { useUserStore } from "./users";
import { url } from "@/utils/HttpRequestInfo";

const userStore = useUserStore();

export const useOccurrenceStore = defineStore("occurrence", {
  state: () => {
    return {
      occurrences: [] as IOccurrence[],
    };
  },
  getters: {},
  actions: {
    async addOccurrence(
      registered_at: string,
      local: string,
      occurrence_type: number,
      km: number
    ): Promise<boolean> {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token") || "no token found"
      );
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        registered_at: registered_at,
        local: local,
        occurrence_type: occurrence_type,
        km: km,
        user_id: userStore.user.id,
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(url + "/occurrences", requestOptions)
        .then((response) => {
          if (response.status === 401) {
            alert("Sessão expirada, faça login novamente");
            localStorage.setItem("token", "");
            window.location.href = "/login";
            return false;
          }
          return response.json();
        })
        .then((result) => {
          if (!result) return false;
          if (result.hasOwnProperty("message")) {
            alert(result.message);
            return false;
          }
          this.$state.occurrences.push(result);
          return true;
        });

      return result;
    },
    async updateOccurrence(
      id: number,
      registered_at: string,
      local: string,
      occurrence_type: number,
      km: number
    ): Promise<boolean> {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token") || "no token found"
      );
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        registered_at: registered_at,
        local: local,
        occurrence_type: occurrence_type,
        km: km,
        user_id: userStore.user.id,
      });

      const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(url + `/occurrences/${id}`, requestOptions)
        .then((response) => {
          if (response.status === 401) {
            alert("Sessão expirada, faça login novamente");
            localStorage.setItem("token", "");
            window.location.href = "/login";
            return false;
          }
          return response.json();
        })
        .then((result) => {
          if (!result) return false;
          if (result.hasOwnProperty("message")) {
            alert(result.message);
            return false;
          }
          alert("Atualização da ocorrência realizada com sucesso");
          return true;
        });
      if (result) {
        location.reload();
      }
      return result;
    },
    async getOccurrences(
      date: string,
      local: string,
      occurrence_type: number,
      km: number,
      user_id: number
    ): Promise<boolean> {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const result = await fetch(
        url +
          `/occurrences/?local=${local}&occurrence_type=${occurrence_type}&km=${km}`,
        requestOptions
      )
        .then((response) => {
          if (response.status === 404) {
            alert("Nenhuma ocorrência encontrada");
            return false;
          }
          return response.json();
        })
        .then((result) => {
          if (!result) return false;
          if (!result.hasOwnProperty("message")) {
            this.$state.occurrences = result;
          }
          return !result.hasOwnProperty("message");
        });
      return result;
    },

    async getOccurrencesByUser(user_id: number): Promise<boolean> {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const result = await fetch(
        url + `/occurrences/users/${user_id}`,
        requestOptions
      )
        .then((response) => {
          if (response.status === 404) {
            alert("Nenhuma ocorrência encontrada");
            return false;
          }
          return response.json();
        })
        .then((result) => {
          if (!result) return false;
          if (!result.hasOwnProperty("message")) {
            this.$state.occurrences = result;
          }
          return !result.hasOwnProperty("message");
        });
      return result;
    },
    async deleteOccurrence(id: number): Promise<boolean> {
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

      const result = await fetch(url + `/occurrences/${id}`, requestOptions)
        .then((response) => {
          if (response.status === 401) {
            alert("Sessão expirada, faça login novamente");
            localStorage.setItem("token", "");
            window.location.href = "/login";
            return false;
          }
          return response.json();
        })
        .then((result) => {
          if (!result) return false;
          if (result.hasOwnProperty("message")) {
            alert(result.message);
          }
          return (
            result.hasOwnProperty("message") &&
            result.message === "Ocorrência excluida com sucesso"
          );
        });
      if (result) {
        this.$state.occurrences = this.$state.occurrences.filter(
          (occurrence) => occurrence.id !== id
        );
      }
      return result;
    },
  },
  persist: true,
});
