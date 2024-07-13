const jwt = require("jsonwebtoken");
const {sendResponse} = require('../helpers/response');

authorization = (role) => {
    return function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token == null) {
            return sendResponse(res, 401, 'Unauthorized');   
        }
        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if(err) {
                return sendResponse(res, 403, 'Forbidden');
            }
            if(role !== decoded.role) {
                return sendResponse(res, 403, 'You Dont Have Permission');
            }
            req.userId = decoded.userId;
            req.email = decoded.email;
            req.role = decoded.role;
            req.isVerified = decoded.isVerified;
            next();
        });
    }
}

module.exports = authorization;