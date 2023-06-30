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
          if (response.status === 200) {
            location.reload();
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
      registered_at: string,
      local: string,
      occurrence_type: number | null,
      km: number | null,
      user_id: number | null,
      isRichardsSubject: boolean | null
    ): Promise<boolean> {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      // Convert empty strings to null
      registered_at = registered_at.length === 0 ? "null" : registered_at;
      local = local.length === 0 ? "null" : local;

      // Convert 0 to null for numeric values
      occurrence_type = occurrence_type === 0 ? null : occurrence_type;
      km = km === 0 ? null : km;
      user_id = user_id === 0 ? null : user_id;

      // Build link URL
      const link = isRichardsSubject
        ? ""
        : `/filter/${registered_at}/${local}/${occurrence_type}/${km}/${user_id}`;

      const result = await fetch(url + `/occurrences${link}`, requestOptions)
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
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token") || "no token found"
      );

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
          if (response.status === 401) {
            alert("Sessão expirada, faça login novamente");
            localStorage.setItem("token", "");
            window.location.href = "/login";
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
          if (response.status === 200) {
            alert("Ocorrência excluida com sucesso");
            location.reload();
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
