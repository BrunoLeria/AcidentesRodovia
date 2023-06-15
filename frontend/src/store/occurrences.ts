import { defineStore } from "pinia";
import { IOccurrence } from "@/interfaces/occurrence.interface";
import { useUserStore } from "./users";
import { getToday } from "@/utils/DateTimeTreatment";
import { getDateForMongo } from "../utils/DateTimeTreatment";
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
          alert(result.message);
          return (
            result.hasOwnProperty("message") &&
            result.message === "Atualização da ocorrência realizada com sucesso"
          );
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
      km: string
    ): Promise<boolean> {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      date = !date ? date : getDateForMongo(date);

      const result = await fetch(
        url +
          `/occurrences/?
registered_at=${date}&local=${local}&occurrence_type=${occurrence_type}&km=${km}`,
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
          alert(result.message);
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
