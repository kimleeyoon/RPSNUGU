const express = require(`express`); // 익스프레스 프레임워크
const http = require("http"); //
const static = require("serve-static"); // 서버 경로 재지정 해주는
const path = require("path"); // OS Path 조정 시 사용
let bodyParser = require("body-parser");
const EventEmitter = require("events").EventEmitter; // 이벤트 on, listener

const Room = require("./room"); // 방 class
const Member = require("./member"); // 멤버 class
const system = require("./logic"); // 로직 프로그램
const getT = require("./main/index").getText;

let nugu = require("./main"); // 스피커 서버에서 실행할 프로그램 받아오는 것 -> index.js
let logger = require("./logger");

const app = express();
let router = express.Router();
const server = http.Server(app); // 익스프레스 사용해서 서버 생성 및 할당
const io = require("socket.io")(server); // socket.io 서버 생성
const redisAdapter = require("socket.io-redis");
io.adapter(redisAdapter({ host: "localhost", port: 6379 }));
// var io = require('socket.io-emitter')(server);
var emitter = require("socket.io-emitter")({
  host: "localhost",
  port: 6379
});

app.use("/", static(path.join(__dirname, "public/dist"))); // public/dist 폴더를 클라이언트가 루트경로로 접근하도록 해줌

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use((err, req, res, next) => next());

app.use("/", router);

server.listen(3000, () => {
  console.log("Server is open");
});

io.on("connection", socket => {
  socket.emit("Hello");
  socket.on("Hello Response", msg => {
    console.log("Response 왔다고 알려라");
  });

  socket.on("How are You?", msg => {
    console.log("I'm fine!");
  });
});
