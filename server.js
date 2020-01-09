const nuguServer = require('./index');
const server = require('./app')(nuguServer);



nuguServer.setMessage('1020201012040210', 'Hello World');
console.log(nuguServer.getMessage('1020201012040210'));