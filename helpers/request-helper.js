import config from "../config.js";
import request from "request";

export const gdParams = (req, obj={}) => {
    // Verifica si falta algún parametro
    Object.keys(config.params).forEach(x => { 
        if (!obj[x]) obj[x] = config.params[x]
    })

    // Header de la IP necesario
    let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for']
    let params = {form: obj, headers: config.ipForwarding && ip ? {'x-forwarded-for': ip, 'x-real-ip': ip} : {}}

    return params
}

export const gdRequest = (req, target, params = {}) => {
    return new Promise((resolve, reject) => {
        if (!target) { return reject("No target defined") }
    
        params = params.headers ? params : gdParams(req, params)
        
        request.post(`${config.endpoint + target}.php`, params, function(err, res, body) {
            let error = err
            if (!error && (err || !body || body.match(/^-\d$/) || body.startsWith("error") || body.startsWith("<"))) {
                error = {serverError: true, response: body}
            }

            if (error) {
                reject(error)
            } else {
                resolve(body)
            }
        })
    })
}