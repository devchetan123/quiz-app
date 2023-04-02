const { Config } = require("../config");
const { postData } = require("./helper");

const config = new Config("dev");
const envDetails = config.getConfig();

export const createQuestion = async (payload) => {

    const headers = {
        "Content-Type": "application/json"
    }

    const response = await postData(`${envDetails.baseUrl}/questions`, "post", headers, payload)
    return response;

}


export const getAllQuestionsAPI = async (quizId) => {
    const headers = {
        "Content-Type": "application/json"
    }

    const response = await postData(`${envDetails.baseUrl}/questions/quiz/${quizId}`, "get", headers)
    return response;
}
