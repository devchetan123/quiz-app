const configs = {
    dev: {
        baseUrl: "http://localhost:3001",
        envName : "development"
    },
    uat: {
        baseUrl: "",
        envName : "uat"
    },
    prod: {
        baseUrl: "",
        envName : "production"
    }
}

class Config {
    constructor(env) {
        this.env = env
    }

    getConfig(env) {
        for (let key in configs) {
            if (key == this.env) {
                return configs[key]
            }
        }
    }
}

module.exports = { Config }
