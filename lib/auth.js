const jwt = require('jsonwebtoken')

module.exports = {
    checkToken: async (req, res, next) => {
        try {
            const bearerHeader = req.headers['authorization'];
            if (typeof bearerHeader !== 'undefined') {
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];
                req.token = bearerToken;
                next();
            } else {
                res.status(400).send({
                    message: 'Token not available'
                })
            }
        }
        catch (err) {
            res.status(500).send({
                message: 'Interval Server Error'
            })
        }
    },
    verifyToken: async (req, res, next) => {
        try {
            let validToken = await jwt.verify(req.token, 'secret')
            req.user = validToken
            next()
        }
        catch (err) {
            res.status(400).send({
                message: 'Invalid Token'
            })
        }
    }
}