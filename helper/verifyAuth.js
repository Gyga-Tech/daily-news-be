const jwt = require('jsonwebtoken')
const verifyAuth = (req, res, next)=> {
    if(!req.headers.authorization) {
        return res.status(401).send({message: "Tokennya Mana Bujang"})
    }else {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, function(err, decoded) {
            console.log(err)
            if(err) {
                return res.status(403).send({message: "Access Forbidden"})
            }
            // console.log(decoded, 'ehehehhe')
            if(decoded.role === 'admin') {
                next()
            }else if(decoded.role === 'user') {
                return res.status(403).send({message: "Access Forbidden"})
            } else {
                return res.status(403).send({message: "Access Forbidden"})
            }
           
        });
    }
    // console.log(req.headers)

}


module.exports = verifyAuth