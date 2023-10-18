import axios from "axios";
import config from "../config.js";

const makeParams = (params = {}) => {
    let res = '';
    for (const key of Object.keys(params)) {
        if (res != '') res+='&'
        res+= `${key}=${params[key]}`
    }
    return res;
}

// PARA HACER LAS REQUEST DESDE EL PROPIO BACKEND
export const gdRequest = (target, params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${config.endpoint + target}.php`,
            method: 'post',
            data: makeParams({...params, ...config.params}),
            headers: {
                'User-Agent': '',
            },
            proxy: (process.env.ROBTOP_PROXY == 1) ? {
                protocol: `${process.env.ROBTOP_PROXY_PROTOCOL}`,
                host: process.env.ROBTOP_PROXY_HOST,
                port: process.env.ROBTOP_PROXY_PORT
            } : null
            // httpAgent: new http.Agent({ keepAlive: true }),
            // httpsAgent: new https.Agent({ keepAlive: true })
        })
        .then(response => {
            const body = response.data;
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

// PARA HACER LAS REQUEST DESDE OTRO BACKEND
// export const gdRequest = async(target, params) => {
//     try {
//         const resp =  await axios({
//             url: process.env.RH_ENDPOINT,
//             method: 'post',
//             data: {
//                 target: config.endpoint + target + '.php',
//                 secret: process.env.RH_SECRET,
//                 params: makeParams({...params, ...config.params}),
    
//             },
//             headers: {
//                 'User-Agent': '',
//             },
//             // httpAgent: new http.Agent({ keepAlive: true }),
//             // httpsAgent: new https.Agent({ keepAlive: true })
//         })
//         return resp.data
//     } catch(err) {
//         console.log(err);
//         return 404
//     }
// }