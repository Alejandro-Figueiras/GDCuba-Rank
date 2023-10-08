import config from "../config.js";
import request from "request";

export const gdParams = (req, obj={}) => {
    Object.keys(config.params).forEach(x => { 
        if (!obj[x]) 
            obj[x] = config.params[x] 
    })
    // Object.keys(req.server.extraParams || {}).forEach(x => { 
    //     if (!obj[x]) 
    //         obj[x] = req.server.extraParams[x] 
    // })

    let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for']
    let params = {form: obj, headers: config.ipForwarding && ip ? {'x-forwarded-for': ip, 'x-real-ip': ip} : {}}
    return params
}

export const gdRequest = function(req, target, params={}, cb=function(){}) {
    if (!target) return cb(true)
    
    let parameters = params.headers ? params : gdParams(req, params)
    let endpoint = config.endpoint
    
    request.post(endpoint + target + '.php', parameters, function(err, res, body) {
      let error = err
      if (!error && (err || !body || body.match(/^-\d$/) || body.startsWith("error") || body.startsWith("<"))) {
            error = {serverError: true, response: body}
      }
      return cb(error, res, body)
    })
}

