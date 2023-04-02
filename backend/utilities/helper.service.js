const { v4: uuidv4 } = require('uuid');

const getUuid = (prefix = null, length = [0, 28]) => {

    const uuid = uuidv4();

    if (!prefix) return uuid;
    const generateUuid = `${prefix}${uuid.substr(length[0], length[1])}`;
    return generateUuid;
}

const isPasswordStrong = (password) => {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~`|}{\\[\\]:;?><,./\\-=])(?=.{8,})");
    return strongRegex.test(password);
}

const pagePayloadHelper = (page = 1, limit = 20) => {
    const payloadCount = parseInt(limit);
    const skipCount = (+page - 1) * (+limit);

    return {
        payloadCount, skipCount
    }
}

module.exports = {
    getUuid, isPasswordStrong, pagePayloadHelper
}