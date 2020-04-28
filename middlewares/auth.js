const jwt = require('jsonwebtoken');
const config =  require('../config/config');

const auth = (req, res, next) => {
    const token_header = req.headers.auth;
    if(!token_header) return res.status(401).send({error: 'Authentication Failed'});

    jwt.verify(token_header, config.auth_pwd, (err, decoded) =>{
        if(err) return res.status(401).send({error: 'Token Invalid'});
        res.locals.auth_data = decoded;
        return next();
    })
}

module.exports = auth;