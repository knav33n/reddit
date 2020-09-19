import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.username.length <= 3 || options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Username must be at least 3 characters or invalid username",
      },
    ];
  }

  if (options.password.length <= 3) {
    return [
      {
        field: "password",
        message: "Password must be atleast 3 characters",
      },
    ];
  }

  return null;
};
