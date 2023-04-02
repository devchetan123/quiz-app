const { Config } = require("../config");
const { postData } = require("./helper");

const config = new Config("dev");
const envDetails = config.getConfig();

export const createQuiz = async (payload, token) => {

    const headers = {
        "Content-Type": "application/json",
        "authorization" : `Bearer ${token}`
    }

    const response = await postData(`${envDetails.baseUrl}/quizs`, "post", headers, payload)
    return response;

}

export const getAllQuiz = async (token) => {
    const headers = {
        "Content-Type": "application/json",
        "authorization" : `Bearer ${token}`
    }

    const response = await postData(`${envDetails.baseUrl}/quizs`, "get", headers)
    return response;
}

export const getCompleteQuiz = async (quizId) => {
    const headers = {
        "Content-Type": "application/json"
    }

    const response = await postData(`${envDetails.baseUrl}/quizs/complete/${quizId}`, "get", headers)
    return response;
}

