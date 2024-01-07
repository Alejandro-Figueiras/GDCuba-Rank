import axios from "axios";
import config from "../../config.js";

const makeParams = (params = {}) => {
    let res = '';
    for (const key of Object.keys(params)) {
        if (res != '') res+='&'
        res+= `${key}=${params[key]}`
    }
    return res;
}

export const gdRequest = (target, params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${config.endpoint + target}.php`,
            method: 'post',
            data: makeParams({...params, ...config.params}),
            headers: {
                'User-Agent': '',
            }
        })
        .then(response => {
            const body = response.data;
            if (body == -1) reject(body)
            let error;
            if (!body || body.match(/^-\d$/) || body.startsWith("error") || body.startsWith("<")) {
                error = {serverError: true, response: body}
            }

            if (error) {
                reject(error);
                console.log(error) 
                return;
            }

            resolve(body);
        })
        .catch(error => {
            console.log(error)
            reject(error)
        })
    })
}