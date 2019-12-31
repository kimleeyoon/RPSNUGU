class Request {
    constructor(httpReq) {
        this.context = httpReq.body.context;
        this.action = httpReq.body.action;
    }
    actionRequest(response, sendData) {
        let actionName = this.action.actionName;
        let parameters = this.action.parameters;
        switch (actionName) {
            case "액션 이름": {
                response.setParameters({
                    roomExist: 1,
                })
                break;
            }
        }
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