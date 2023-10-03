const checkEmail = (req,res,next) => {

    const email = req.body.email

    if(email.endsWith('@gmail.com')){
        return next()
    }else{
        res.send("Please enter a valid email")
    }
}

module.exports = {checkEmail}