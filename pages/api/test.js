import newAPI from "./new.js";

export default (req, res) => {

    let method = "GET"


    const methodParam =  req.query.method ? req.query.method.toUpperCase() : undefined
    if (methodParam) method = methodParam
    req.method = method

    newAPI(req, res)
};
