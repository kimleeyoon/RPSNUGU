const express = require(`express`); // 익스프레스 프레임워크
const http = require("http"); //
const static = require("serve-static"); // 서버 경로 재지정 해주는
const path = require("path"); // OS Path 조정 시 사용
let bodyParser = require("body-parser");

let nugu = require("./index"); // 스피커 서버에서 실행할 프로그램 받아오는 것 -> index.js

const app = express();
let router = express.Router();
const server = http.Server(app); // 익스프레스 사용해서 서버 생성 및 할당
const io = require("socket.io")(server); // socket.io 서버 생성
const redisAdapter = require("socket.io-redis");
io.adapter(
  redisAdapter({
    host: "localhost",
    port: 6379
  })
);
// var io = require('socket.io-emitter')(server);
// var emitter = require("socket.io-emitter")({
//   host: "localhost",
//   port: 6379
// });

app.use("/", static(path.join(__dirname, "public/dist"))); // public/dist 폴더를 클라이언트가 루트경로로 접근하도록 해줌

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use((err, req, res, next) => next());

// routing 시작
router.route("/nugu/SayWhatToDoAction").post((req, res, next) => {
  console.log("SayWhatToDoAction 옴");
  
  let id = nugu(req, res, next, createSystem);

});

router.route("/nugu/WebSelectAction").post((req, res, next) => {
  console.log("WebSelectAction 옴");
  System = new System
  systems[id] = system
  nugu(req, res, next, createSystem);
});

router.route("/nugu/ResultAction").post((req, res, next) => {
  console.log("ResultAction 옴");
  nugu(req, res, next, createSystem);
});

// routing 끝
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

let systems = new Systems()

function createSystem(id){
  systems.appendSystem(id)
}

class Systems {
  constructor(){
    this.systems = []
  }
  appendSystem(id){
    this.systems[id] = new System()
  }
}

class System {
  constructor(){
    this.state = "None"
    this.speakerItem = "None"
    this.methods = {}
    this.methods.setSpeakerItem = function(item) {
      this.speakerItem = item
    }
    this.methods.setState = function(item) {
      this.state = item
    }
  }

}


