async function postData(url, method = "post", headers = { "Content-Type": "application/json" }, data = null) {
    // console.log(axios)
    try {
        const requestOptions = {
            method: method,
            headers: headers
        }

        if (method.toLowerCase() == "post") {
            requestOptions.body = JSON.stringify(data);
        }

        const res = await fetch(url, requestOptions);
        return res

    } catch (error) {
        // throw new Error(error.message)
        console.error(error);
    }
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function setSession(key, data){
    localStorage.setItem(key, JSON.stringify(data));
};

function getSession(key) {
    const user = localStorage.getItem(key);
    return user ? JSON.parse(user) : null;
};

function clearSession (key) {
    localStorage.removeItem(key);
};


module.exports = { postData, capitalizeFirstLetter , setSession, getSession, clearSession}