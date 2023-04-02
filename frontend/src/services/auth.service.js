const { Config } = require("../config");
const { postData } = require("./helper");

const config = new Config("dev");
const envDetails = config.getConfig();

export const loginAPI = async (payload) => {

    const headers = {
        "Content-Type": "application/json"
    }

    const response = await postData(`${envDetails.baseUrl}/auth/login`, "post", headers, payload)
    return response;

}

export const registerAPI = async (payload) => {

    const headers = {
        "Content-Type": "application/json"
    }

    const response = await postData(`${envDetails.baseUrl}/auth/register`, "post", headers, payload)
    return response;

}