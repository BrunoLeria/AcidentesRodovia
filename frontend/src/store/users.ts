import { IUser } from "@/interfaces/user.interface";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userList: [],
      user: {} as IUser,
    };
  },
  getters: {},
  actions: {
    verifyUser(email: string, password: string): IUser | undefined {
      const user = this.$state.userList.find(
        (user: IUser) => user.email === email && user.password === password
      );
      return user;
    },
  },
});
