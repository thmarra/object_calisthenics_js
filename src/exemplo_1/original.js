const crypto = require("crypto");

module.exports = (data) => {
  const passwordSalt = "somesalt";

  const user = {
    name: data.name,
    age: data.age,
    email: data.email,
    validDocument: data.manualValidation,
    tier: "bronze",
  };

  if (data.password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const hash = crypto.createHash("sha256");
  hash.update(data.password + passwordSalt);
  user.password = hash.digest("hex");

  if (data.location === "Brazil") {
    user.language = "pt-br";

    // validates the user`s CPF
    const cpf = data.document.replace(/\D/g, "");

    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) {
      user.validDocument = false;
    } else {
      var result = true;
      [9,10].forEach((j) => {
          var soma = 0, r;
          cpf.split(/(?=)/).splice(0,j).forEach((e, i) => {
              soma += parseInt(e) * ((j+2)-(i+1));
          });
          r = soma % 11;
          r = (r <2) ? 0 : 11-r;

          if(r != cpf.substring(j, j+1)) {
            result = false;
          }
      });

      user.validDocument = result;
    }

    if (user.validDocument && data.manualValidation) {
      user.tier = "gold";
    } else if (!user.validDocument && data.manualValidation) {
      user.tier = "silver";
    }
  } else if (data.location === "Portugal") {
    user.language = "pt";
  } else if (
    data.location === "Spain" ||
    data.location === "Mexico" ||
    data.location === "Argentina"
  ) {
    user.language = "es";
  } else {
    user.language = "en";
  }

  return user;
};
