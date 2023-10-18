const crypto = require("crypto");

const language = {
  Brazil: "pt-br",
  Portugal: "pt",
  Spain: "es",
  Mexico: "es",
  Argentina: "es",
  default: "en",
};

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

  if (cpf.toString().length == 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  var result = true;
  [9, 10].forEach(function (j) {
    var soma = 0,
      r;
    cpf
      .split(/(?=)/)
      .splice(0, j)
      .forEach(function (e, i) {
        soma += parseInt(e) * (j + 2 - (i + 1));
      });
    r = soma % 11;
    r = r < 2 ? 0 : 11 - r;
    if (r != cpf.substring(j, j + 1)) result = false;
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
    language: language[data.location] || language.default,
  };
  
  if (data.location === "Brazil") {
    user.validDocument = validateCpf(data.document);
    user.tier = brazilianTier(user.validDocument, data.manualValidation);
  }

  return user;
};
