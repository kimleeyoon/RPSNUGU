const nuguServer = require('./index');
const server = require('./app')(nuguServer);

console.log(server.getMessage());
console.log(server.setMessage("asdfasfds"));
console.log(server.getMessage());