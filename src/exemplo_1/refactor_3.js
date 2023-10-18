const crypto = require("crypto");
const { cp } = require("fs");

class Password {
  constructor(password) {
    this.password = this.createHash(password);
  }

  toString() {
    return this.password;
  }

  validate() {
    if (this.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
  }

  getSalt() {
    return "somesalt";
  }

  createHash(password) {
    const hash = crypto.createHash("sha256");
    hash.update(password + this.getSalt());
    return hash.digest("hex");
  }

  compareAgainst(hash) {
    return hash === this.password;
  }
}

// Poderia herdar de uma classe Document genérica assim como BrazilianUser herdou de User
class CPF {
  constructor(document) {
    this.value = document;
  }

  toString() {
    return this.value;
  }

  isValid() {
    const cpf = this.value.replace(/\D/g, "");

    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    var result = true;

    [9, 10].forEach(function (j) {
      var soma = 0, r;
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
}

class User {
  constructor(data) {
    this.name = data.name;
    this.age = data.age;
    this.email = data.email;
    this.password = new Password(data.password);
    this.document = data.document;
    this.validDocument = data.manualValidation;
    this.tier = "bronze";
    this.language = "en";

    this.password.validate();
  }
}

class BrazilianUser extends User {
  constructor(data) {
    super(data);

    this.language = "pt-br";

    const cpf = new CPF(data.document);
    this.document = cpf.toString();
    this.validDocument = cpf.isValid();

    this.tier = this.getTier(this.validDocument, data.manualValidation);
  }

  getTier(validDocument, manualValidation) {
    if (!manualValidation) {
      return "bronze";
    }
  
    return validDocument ? "gold" : "silver";
  }
}

class PortugueseUser extends User {
  constructor(data) {
    super(data);
    this.language = "pt";
  }
}

class SpanishUser extends User {
  constructor(data) {
    super(data);
    this.language = "es";
  }
}

module.exports = (data) => {
  if (data.location === "Brazil") {
    return new BrazilianUser(data);
  } 
  
  if (data.location === "Portugal") {
    return new PortugueseUser(data);
  } 
  
  if (["Spain", "Mexico", "Argentina"].includes(data.location)) {
    return new SpanishUser(data);
  }

  return new User(data);
};
