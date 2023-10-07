//This middleware determines whether the email ends with @gmail.com or not
const checkEmail = (req,res,next) => {

    const email = req.body.email

    if(email.endsWith('@gmail.com')){
        return next()
    }else{
        res.status(403).send("Please enter a valid email")
    }
}

module.exports = {checkEmail}