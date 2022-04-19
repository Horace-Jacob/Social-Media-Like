import { UserInputFields } from "../resolvers/UserInputFields";

export const validateRegister = (fields: UserInputFields) => {
  // const validateSpace = new RegExp("/^s+$/");
  if (!fields.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email",
      },
    ];
  }

  if (fields.username.trim() === "") {
    return [
      {
        field: "username",
        message: "Invalid username",
      },
    ];
  }

  if (fields.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Cannot include @ sign in username",
      },
    ];
  }

  if (fields.username.length <= 1) {
    return [
      {
        field: "username",
        message: "Length of the user must be greater than 2",
      },
    ];
  }

  if (fields.password.length <= 2) {
    return [
      {
        field: "password",
        message: "Length of the password must be greater than 3",
      },
    ];
  }
  return null;
};
