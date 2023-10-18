const createUser1 = require('./original.js');
const createUser2 = require('./refactor_1.js');
const createUser3 = require('./refactor_2.js');
const createUser4 = require('./refactor_2_polimorfismo.js');
const createUser5 = require('./refactor_3.js');

const data = {
    name: 'Jason Lee Scott',
    age: 25,
    email: 'ranger@bff.com.br',
    document: '785.866.686-05',
    password: '12345678',
    location: "Brazil",
    manualValidation: true,
};

console.log(createUser1(data));
console.log(createUser2(data));
console.log(createUser3(data));
console.log(createUser4(data));
console.log(createUser5(data));