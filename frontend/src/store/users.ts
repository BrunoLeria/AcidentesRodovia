import { IUser } from "@/interfaces/user.interface";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userList: [
        {
          id: 1,
          email: "michael.lawson@reqres.in",
          name: "Michael Lawson",
          password: "!!Xz%Y5VuN",
        },
        {
          id: 2,
          email: "lindsay.ferguson@reqres.in",
          name: "Lindsay Ferguson",
          password: "@58Dv7ym6M",
        },
        {
          id: 3,
          email: "tobias.funke@reqres.in",
          name: "Tobias Funke",
          password: "4pwAM5&tWo",
        },
        {
          id: 4,
          email: "byron.fields@reqres.in",
          name: "Byron Fields",
          password: "7$J63g^V2n",
        },
        {
          id: 5,
          email: "george.edwards@reqres.in",
          name: "George Edwards",
          password: "i2S$DHxATx",
        },
      ],
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
