const ErrorValidations = ({
  username,
  email,
  password,
  fullname,
  phone,
  fields = [],
}) => {

  const validationErrors = [];

  const userNameRegex = /^[a-zA-Z0-9_]{4,15}$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const rules = {
    username: {
      validate: () =>
        typeof username === "string" &&
        username.trim() !== "" &&
        userNameRegex.test(username),

      message: "Enter your username!",
    },

    email: {
      validate: () =>
        typeof email === "string" &&
        email.trim() !== "",

      message: "Enter your email!",
    },

    password: {
      validate: () =>
        typeof password === "string" &&
        password.trim() !== "" &&
        passwordRegex.test(password),

      message: "Enter your password!",
    },

    fullname: {
      validate: () =>
        typeof fullname === "string" &&
        fullname.trim() !== "",

      message: "Enter your fullname!",
    },

    phone: {
      validate: () =>
        typeof phone === "string" &&
        phone.trim() !== "",

      message: "Enter your phone number!",
    },
  };

  for (const field of fields) {
    const rule = rules[field];

    if (rule && !rule.validate()) {
      validationErrors.push({
        message: rule.message,
        success: false,
      });
    }
  }

  return validationErrors;
};

const DuplicateErrors = ({
  username,
  email,
  phone,
  rows,
  fields = [],
}) => {

  const duplicateErrors = [];

  if (!rows) return duplicateErrors;

  const checks = {
    username: () => {
      if (username && rows.username === username) {
        duplicateErrors.push({
          message: "This username is already taken",
          success: false
        });
      }
    },

    email: () => {
      if (email && rows.email === email) {
        duplicateErrors.push({
          message: "⚠ An account already exists with this email",
          success: false
        });
      }
    },

    phone: () => {
      if (phone && rows.phone === phone) {
        duplicateErrors.push({
          message: "An account has already been created with this phone number",
          success: false
        });
      }
    },
  };

  for (const field of fields) {
    if (checks[field]) {
      checks[field]();
    }
  }

  return duplicateErrors;
};

const CheckUndefined = (fields, allowedFields) => {
  const result = {}

  for(const [field, value] of Object.entries(fields)){
    if(allowedFields.includes(field) && value !== undefined){
      result[field] = value;
    }
  }

  return result
}

module.exports = { ErrorValidations, DuplicateErrors, CheckUndefined};