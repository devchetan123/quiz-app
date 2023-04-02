const { getUuid } = require("./helper.service")

const http = (req, data, message = null) => {

    // create basic payload
    const responseId = getUuid();

    let payload = {
        id: responseId,
        statusCode: getStatusCode(req.method),
        success: true,
        data: {},
        error: {}
    }

    if (message) payload.message = message;

    for (const key in data) {
        const item = data[key];
        if (key === 'statusCode') {
            payload.statusCode = item;
        }
        else if (key === 'error') {
            payload.error = item;
            payload.success = false;
        }
        else {
            payload.data[key] = item;
        }
    }

    return payload;

}

const error = (err = null, message = null, code = 500) => {

    message = message ? message : 'something went wrong';

    if (err && err.name === 'ValidationError') code = 400;

    let payload = {
        statusCode: code,
        error: {
            message: message
        }
    }

    if (err.errCode && err.errCode.length > 0) {
        const error = {
            message: payload.error.message,
            error: err.errCode
        }
        payload.error = error
    }

    return payload;
}


const getStatusCode = (method) => {

    switch (method) {
        case 'GET':
            return 200;
        case 'POST':
            return 201;
        case 'PUT':
            return 202;
        case 'DELETE':
            return 202;
        default:
            return 405;
    }
}


module.exports = {
    http, error
}