export const nameRules = [
  (value: string) => !!value || "Name is required.",
  (v: string) => v.length >= 3 || "Min 3 characters",
  (v: string) => /^[a-zA-Z ]*$/.test(v) || "Only letters",
];
export const emailRules = [
  (v: string) => !!v || "Email is required",
  (v: string) => /.+@.+\..+/.test(v) || "Email must be valid",
];
export const passwordRules = [
  (v: string) => !!v || "Password is required",
  (v: string) => v.length >= 8 || "Min 8 characters",
];
export const kmRules = [
  (v: string) => !!v || "Km is required",
  (v: string) => /^\d+$/.test(v) || "Km must be valid",
  (v: string) => v.length <= 6 || "Max 6 characters",
];
export const localRules = [
  (v: string) => !!v || "Local is required",
  (v: string) => v.length >= 3 || "Min 3 characters",
];
export const dateRules = [
  (v: string) => !!v || "Date is required",
  (v: string) => /^\d[4]-\d[2]-\d[2]$/.test(v) || "Date must be valid",
];
export const requiredRules = [(v: string) => !!v || "Required"];
