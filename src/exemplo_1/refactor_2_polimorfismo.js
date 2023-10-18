const crypto = require("crypto");

class User {
  constructor(data) {
    this.name = data.name;
    this.age = data.age;
    this.email = data.email;
    this.password = this.hashPassword(data.password);
    this.document = data.document;
    this.validDocument = data.manualValidation;
    this.tier = "bronze";
    this.language = "en";
  }

  hashPassword(password, salt = "somesalt") {
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const hash = crypto.createHash("sha256");
    hash.update(password + salt);
    return hash.digest("hex");
  }
}

class BrazilUser extends User {
  constructor(data) {
    super(data);
    this.language = "pt-br";
    this.validDocument = this.validateDocument(data.document);
    this.tier = this.getTier(this.validDocument, data.manualValidation);
  }

  validateDocument(document) {
    const cpf = document.replace(/\D/g, "");

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

  getTier(validDocument, manualValidation) {
    if (!manualValidation) {
      return "bronze";
    }
  
    return validDocument ? "gold" : "silver";
  }
}

class PortugalUser extends User {
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
    return new BrazilUser(data);
  } 
  
  if (data.location === "Portugal") {
    return new PortugalUser(data);
  } 
  
  if (["Spain", "Mexico", "Argentina"].includes(data.location)) {
    return new SpanishUser(data);
  }

  return new User(data);
};
