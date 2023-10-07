//To make sure the content type is always application/json
const parseJSON = (req,res,next) => {
    if(req.headers['content-type'] === 'application/json'){
        return next(); //If it's json we can continue with our request
    }else(
        res.status(400).send(req.headers)
    )
}

module.exports = {parseJSON}