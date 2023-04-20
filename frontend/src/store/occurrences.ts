import { defineStore } from "pinia";
import { IOccurrence } from "@/interfaces/occurrence.interface";
import { useUserStore } from "./users";
import { getToday } from "@/utils/DateTimeTreatment";

const userStore = useUserStore();

export const useOccurrenceStore = defineStore("user", {
  state: () => {
    return {
      occurrences: [] as IOccurrence[],
    };
  },
  getters: {},
  actions: {
    async addOccurrence(
      local: string,
      occurrence_tipe: string,
      km: number
    ): Promise<boolean> {
      const myHeaders = new Headers();
      myHeaders.append(
        "x-token",
        localStorage.getItem("token") || "no token found"
      );
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        registered_at: getToday(),
        local: local,
        occurrence_tipe: occurrence_tipe,
        km: km,
        user_id: userStore.user.id,
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(
        "http://localhost:5000/occurrences",
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.hasOwnProperty("message")) {
            alert(result.message);
            return false;
          } else {
            this.$state.occurrences.push(result);
            return true;
          }
        });

      return result;
    },
    async updateUser(
      id: number,
      local: string,
      occurrence_tipe: string,
      km: number
    ): Promise<boolean> {
      const myHeaders = new Headers();
      myHeaders.append(
        "x-token",
        localStorage.getItem("token") || "no token found"
      );
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        local: local,
        occurrence_tipe: occurrence_tipe,
        km: km,
      });

      const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const result = await fetch(
        `http://localhost:5000/occurrences/${id}`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          alert(result.message);
          return (
            result.hasOwnProperty("message") &&
            result.message === "Atualização da ocorrência realizada com sucesso"
          );
        });

      return result;
    },
    async deleteUser(id: number): Promise<boolean> {
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
        `http://localhost:5000/occurrences/${id}`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          alert(result.message);
          return (
            result.hasOwnProperty("message") &&
            result.message === "Ocorrência excluida com sucesso"
          );
        });

      return result;
    },
  },
  persist: true,
});
