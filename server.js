const nuguServer = require('./index');
const server = require('./app')(nuguServer);

server.createPromise('1111', voteEnd);

function voteEnd(){
    console.log("voteEnd");
}

