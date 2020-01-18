class Request {
  constructor(httpReq) {
    this.context = httpReq.body.context;
    this.action = httpReq.body.action;
  }
  actionRequest(response, sendData) {
    let actionName = this.action.actionName;
    let parameters = this.action.parameters;

    let setPar = setParametersFactory(response, sendData)

    switch (actionName) {
      case "SayWhatToDoAction": {
        // response.setParameters({
        //     roomExist: 1,
        // }, sendData)
        setPar({ //올ㅋ
          roomExist: 1

        })
        return this.context.session.id; //이거 어따 써? 웹에서 들어오는 응답이랑 매칭?
        break;
      }
      case "WebSelectAction": {
        let web_item = 1 //일단 가위라고 쳐 가정. 이걸 웹에서 받아올거임. 가위 : 1, 바위 : 0, 보 : -1
        let game_result = 0 //일단 지금은 비긴거. 1은 이긴거, -1은 진거(스피커 값에서 웹 값 뺀 값이 0이면 비김, -1, 2는 이긴거. 나머지는 진거)
        if (parameters.SpeakerItem - web_item == 0) { //비김
          game_result = 0
        }
        if (Parameters.SpeakerItem - web_item == 2 || parameters.SpeakerItem - web_item == -1) { //이김
          game_result = 1
        } else { //짐
          game_result = -1
        }
        if (!!parameters) { // 파라미터가 존재한다면
          if (parameters.length != 0) {
            parameters.SpeakerItem
            response.setParameters({
              WebItem: web_item,
              GameResult: game_result
            }, sendData)
          }
        } else { // 파라미터가 없다면

        }
        break;
      }
      case "ResultAction": {
        let web_item = 1 //일단 가위라고 쳐 가정. 이걸 웹에서 받아올거임. 가위 : 1, 바위 : 0, 보 : -1
        let game_result = 0 //일단 지금은 비긴거. 1은 이긴거, -1은 진거(스피커 값에서 웹 값 뺀 값이 0이면 비김, -1, 2는 이긴거. 나머지는 진거)
        if (parameters.SpeakerItem - web_item == 0) { //비김
          game_result = 0
        }
        if (Parameters.SpeakerItem - web_item == 2 || parameters.SpeakerItem - web_item == -1) { //이김
          game_result = 1
        } else { //짐
          game_result = -1
        }
        response.setParameters({
          WebItem: web_item,
          GameResult: game_result
        }, sendData);

        break;
      }
    }
  }
}

function setParametersFactory(response, sendData) {
  return function(data) {
    response.setParameters(data, sendData);
  }
}

let messages = {};

function setMessage(sessionId, message) {
  messages[sessionId] = message;
}

function getMessage(sessionId) {
  return messages[sessionId];
}

class Response {
  constructor() {
    this.version = '2.0';
    this.resultCode = 'OK';
    this.output = {};
    this.directives = [];
  }
  setParameters(result, sendData) {
    this.output = {
      roomExist: result.roomExist
    }

    sendData(this);
  }
}

const reqObject = (req, res, next) => {
  response = new Response();
  request = new Request(req);
  request.actionRequest(response, (r) => {
    res.send(r)
  });
  console.log(`NPKResponse: ${JSON.stringify(response)}`);
};

module.exports = reqObject;
module.exports.setMessage = setMessage;
module.exports.getMessage = getMessage;
