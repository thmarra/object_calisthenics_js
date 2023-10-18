const crypto = require("crypto");

function passwordHash(password, salt = "somesalt") {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const hash = crypto.createHash("sha256");
  hash.update(password + salt);
  return hash.digest("hex");
}

function validateCpf(document) {
  const cpf = document.replace(/\D/g, "");

  if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  var result = true;
  [9, 10].forEach((j) => {
    var soma = 0, r;
    cpf
      .split(/(?=)/)
      .splice(0, j)
      .forEach((e, i) => {
        soma += parseInt(e) * (j + 2 - (i + 1));
      });
    r = soma % 11;
    r = r < 2 ? 0 : 11 - r;
    if (r != cpf.substring(j, j + 1)) {
      result = false;
    }
  });

  return result;
}

function brazilianTier(validDocument, manualValidation) {
  if (!manualValidation) {
    return "bronze";
  }

  return validDocument ? "gold" : "silver";
}

module.exports = (data) => {
  const user = {
    name: data.name,
    age: data.age,
    email: data.email,
    password: passwordHash(data.password),
    document: data.document,
    validDocument: true,
    tier: "bronze",
    language: "en",
  };

  if (data.location === "Brazil") {
    user.language = "pt-br";
    user.validDocument = validateCpf(data.document);
    user.tier = brazilianTier(user.validDocument, data.manualValidation);
  } else if (data.location === "Portugal") {
    user.language = "pt";
  } else if (
    data.location === "Spain" ||
    data.location === "Mexico" ||
    data.location === "Argentina"
  ) {
    user.language = "es";
  }

  return user;
};
