const jwt = require('jsonwebtoken')

//This determines whther there is a valid jwt token in use
const JWTTest = (req, res, next) => {
    console.log(req.headers.token)
    let token = req.headers.token

    try{
        jwt.verify(token, "SecretKey")
        next()
    }catch(error){
        console.log(error)
        res.send(error.message)
    }
    
}

module.exports = {JWTTest}