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
                setPar({      //올ㅋ
                    roomExist: 1
                    
                })
                return this.context.session.id;
                break;
            }
            case "WebSelectAction": {
                if(!!parameters){ // 파라미터가 존재한다면
                    if(parameters.length != 0){
                        parameters.SpeakerItem
                    }
                }else{ // 파라미터가 없다면

                }
                break;
            }
            case "ResultAction" : {

                break;
            }
        }
    }
}

function setParametersFactory(response, sendData){
    return function(data){
        response.setParameters(data, sendData);
    }
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


